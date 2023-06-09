const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const { requireAuth, } = require("../../utils/auth");
const { } = require('../../utils/validation');
const { User, Group, Membership, Event, Attendee} = require("../../db/models");

// Get all attendees by eventId
router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params

    const event = await Event.findOne({ where: { id: eventId }})
    const group = await Group.findOne({ where: { id: eventId }})

    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }

    const coHost = await Membership.findOne({ where: { memberId: req.user.id, groupId: group.id } });

    // if cohost or organizer, allow to see all status
    if ((coHost && coHost === 'co-host') || req.user.id === group.organizerId) {

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

    } else { // else if not co-host or organizer, show all status but pending

        const attendees = await User.findAll({
            include: {
                model: Attendee,
                attributes: [],
                where: {
                    eventId: eventId,
                    status: { [Op.notIn]: ['pending'] }
                }
            },
            attributes: {
                exclude: ['username']
            },
            raw: true
        })
        for (let i = 0; i < attendees.length; i++) {
            const attendee = attendees[i];
            attendee.Attendance = await Attendee.findOne({
              where: {
                userId: attendee.id,
                eventId: eventId
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
});

router.put('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params
    const { userId, status } = req.body

    const event = await Event.findOne({where: { id:eventId }})
    const coHost = await Membership.findOne({ where: { memberId: req.user.id, groupId: eventId }})
    const group = await Group.findOne({where: { id: eventId }})
    const attendee = await Attendee.findOne({where: { userId: userId, eventId: eventId }})

    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }

    if (status === 'pending') {
        const err = new Error("Cannot change an attendance status to pending");
        err.status = 400
        return next(err)
    }

    if (attendee && attendee.status === 'member' && status === 'member') {
        const err = new Error("Attendee is already a member of the event");
        err.status = 400
        return next(err)
    }

    if (attendee && attendee.status === 'waitlist' && status === 'waitlist') {
        const err = new Error("Attendee is on the waitlist");
        err.status = 400
        return next(err)
    }

    if (!attendee) {
        const err = new Error("Attendance between the user and the event does not exist");
        err.status = 404
        return next(err)
    }

    if ((coHost && coHost === 'co-host') || req.user.id === group.organizerId) {
        await attendee.update({ userId, status })
        const safeUpdate = {
            id: attendee.id,
            eventId: eventId,
            userId: userId,
            status: status
        }
        res.json(safeUpdate)
    } else {
        const err = new Error("User does not have permission to change status");
        err.status = 403
        return next(err)
    }
});

router.delete('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params
    const { userId } = req.body

    const attendee = await Attendee.findOne({where: { userId: userId, eventId: eventId }})
    const event = await Event.findOne({where: { groupId: eventId }})
    const group = await Group.findOne({where: { id: eventId }})

    if (!event) {
        const err = new Error("Event couldn't be found")
        err.status = 404
        return next(err)
    }

    if (!attendee) {
        const err = new Error("Attendance does not exist for this User");
        err.status = 404
        return next(err)
    }

    if (req.user.id === group.organizerId || req.user.id === attendee.userId) {
        await attendee.destroy()

        res.json({message: "Successfully deleted attendance from event"})
    } else {
        const err = new Error("Only the User or organizer may delete an Attendance");
        err.status = 403
        return next(err)
    }
})

module.exports = router
