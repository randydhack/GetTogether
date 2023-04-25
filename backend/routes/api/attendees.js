const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const { requireAuth, } = require("../../utils/auth");
const { validateGroupCreate, validateVenue, validateEvent } = require('../../utils/validation');
const { User, Group, Membership, Venue, sequelize, Image, Event, Attendee} = require("../../db/models");


// Come back after finishing request to attend event
router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params

    const coHost = await Membership.findOne({ where: { memberId: req.user.id } });
    const event = await Event.findOne({ where: { id: eventId }})
    const group = await Group.findOne({ where: { id: event.groupId }})

    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }

    const attendees = await User.findAll({
        include: {
            model: Attendee,
            attributes: [],
            where: {
                eventId: eventId
            }
        },
        attributes: {
            exclude: ['username']
        },
        raw: true
    })

    if ((coHost && coHost === 'coHost') || req.user.id === group.organizerId) {
        for (let i = 0; i < attendees.length; i++) {
            const attendee = attendees[i];
            attendee.Attendance = await Attendee.findOne({
              where: {
                userId: attendee.id,
                eventId: eventId,
              },
              attributes: ["status"],
            });
          }
          res.json({ Attendees: attendees});
    } else {
        for (let i = 0; i < attendees.length; i++) {
            const attendee = attendees[i];
            attendee.Attendance = await Attendee.findOne({
              where: {
                userId: attendee.id,
                eventId: eventId,
                status: 'waitlist'
              },
              attributes: ["status"]
            });
          }
          res.json({ Attendees: attendees});
    }
});

router.post('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params

    const event = await Event.findOne({ where: { id: eventId }})
    const member = await Membership.findOne({ where: { memberId: req.user.id, groupId: eventId }})
    const checkAttendance = await Attendee.findOne({ where: { userId: req.user.id, eventId: eventId}})

    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }

    if (checkAttendance && checkAttendance.status === 'pending') {
        const err = new Error("Attendance has already been requested");
        err.status = 400
        return next(err)
    }

    if (checkAttendance && checkAttendance.status === 'member') {
        const err = new Error("User is already an attendee of the event");
        err.status = 400
        return next(err)
    }

    if (member) {
        const attendance = await Attendee.create({ eventId: eventId, userId: req.user.id, status: 'pending' });
        const safeAttendance = {
            eventId: attendance.eventId,
            userId: req.user.id,
            status: attendance.status
        }
        res.json(safeAttendance)
    } else {
        const err = new Error("User is not a member of the group");
        err.status = 400
        return next(err)
    }
})

module.exports = router
