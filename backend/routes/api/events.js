const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { validateEvent } = require('../../utils/validation');
const { Group, Venue, Image, Event, Attendee, Membership, sequelize } = require("../../db/models");
const e = require("express");

// ------------------ GET ENDPOINTS -----------------------

// Get all events
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
        exclude: ['price','capacity', 'description'],
    },
    group: 'Event.id'
    });
    res.status(200).json(events)
})

// get event by eventID
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
            as: 'EventImages',
            attributes: ['id', 'url']
        },{
            model: Attendee,
            attributes: []
        }],
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('Attendees.id')), 'numAttendees']],
            exclude: ['description']
        },
    })
    res.status(200).json(event)
});

// ------------------ POST ENDPOINTS -----------------------

// Add image to event by eventId
// NOTE: preview will not part of the image table
router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    const { eventId } = req.params
    const { url } = req.body
    const event = await Event.findOne({ where: { id: eventId }})
    const user = await Attendee.findOne({where:{userId: req.user.id}})

    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }
    if (user.eventId === event.id) {
        const image = await Image.create({ url, imageableType: 'Event', imageableId: event.id })
        const safeImage = {
            id: image.id,
            url: image.url
        }
        res.status(200).json(safeImage)
    } else {
        const err = new Error('User is not associate with the event')
        err.status = 403
        return next(err)
    }
})

// ------------------ PUT ENDPOINTS -----------------------

router.put('/:eventId', requireAuth, validateEvent, async (req, res, next) => {
    const { eventId } = req.params;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    const event = await Event.findOne({ where: { id: eventId }})
    const group = await Group.findOne({where: {id: event.groupId }})
    const user = await Membership.findOne({where: { userId: req.user.id}})
    const venue = await Venue.findOne({where: { id: venueId }})

    if (!venue) {
        const err = new Error("Venue couldn't be found")
        err.status = 404
        return next(err)
    }
    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }

    if (user.status === 'co-host' || req.user.id === group.organizerId) {

        await event.update({ venueId, name, type, capacity, price, description, startDate, endDate })
        const safeEvent = {
            venueId, name, type, capacity, price, description, startDate, endDate
        }

        res.json(safeEvent)
    }
});

router.delete('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params

    const user = await Membership.findOne({ where: { userId: req.user.id }})
    const event = await Event.findOne({ where: { id: eventId}})
    const group = await Group.findOne({where: { id: event.groupId }})

    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }

    if (user.status === 'co-host' || req.user.id === group.organizerId) {
        await event.destroy()

        res.status(200).json({
            "message": "Successfully deleted"
          })
    } else {
        const err = new Error("User does not have permission")
        err.status = 403
        return next(err)
    }
})





module.exports = router
