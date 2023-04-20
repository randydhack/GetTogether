const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { validateGroupCreate, validateVenue } = require('../../utils/validation');
const { User, Group, Membership, Venue, Image, Event, Attendee, sequelize } = require("../../db/models");

router.get('/', async (req, res, next) => {
    const events = await Event.findAll({
        include: [{
            model: Group,
            attributes: ['id', 'name', 'city', 'state']
        },
        {
            model: Attendee,
            attributes: []
        },
        {
            model: Venue,
            attributes: ['id', 'city','state']
        }
    ],
    attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('Attendees.id')), 'numAttendees']],
        exclude: [['price'], ['capacity']],
    },
    group: 'Event.id'
    });
    res.status(200).json(events)
})

// get event by eventID
//Come back and add more features as some are missing atm
// event needs to have capacity and price
router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params
    const eventCheck = await Event.findOne({where: { id: eventId}});
    if (!eventCheck) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        return next(err)
    }

    const event = await Event.findOne({
        where: {
            id: eventId
        },
        include: [{
            model: Group,
            attributes: ['id', 'name', 'private', 'city', 'state']
        }, {
            model: Venue,
            attributes: {
                exclude: ['groupId', 'createdAt', 'updatedAt']
            }
        }, {
            model: Image,
            as: 'EventImages'
        },{
            model: Attendee,
            attributes: []
        }],
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('Attendees.id')), 'numAttendees']],
            exclude: ['price', 'capacity']
        },
    })

    res.json(event)
})



module.exports = router
