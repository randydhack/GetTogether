const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { validateGroupCreate, validateVenue } = require('../../utils/validation');
const { User, Group, Membership, Venue, sequelize, Image, Event, Attendee} = require("../../db/models");

// Get all groups with numMembers
router.get('/', async (req, res, next) => {

    const allGroups = await Group.findAll({
            include: {
                model: Membership,
                attributes: []
            },
            attributes: {
             include: [
                [sequelize.fn('COUNT', sequelize.col('Memberships.groupId')), 'numMembers'],
            ]},
            group: 'Group.id'
        })

    res.status(200).json({ Groups: allGroups })
})

// Restore session user / get current user
router.get("/currentUser", requireAuth, async (req, res) => {
    const { user } = req;
  if (user) {
    const currentUser = await User.findOne({
        where: {
            id: user.id
        }
    })

    const groupId = await Membership.findOne({
        where: {
            userId: currentUser.id
        }
    })

    if (groupId) {
        const allGroups = await Group.findAll({
            where: {
                id: groupId.groupId
            },
            include: [{
                model: Membership,
                attributes: []
            },
        {
            model: Image,
            as: 'GroupImages',
            attributes: []
        }],
            attributes: {
                include: [
                [sequelize.fn('COUNT', sequelize.col('Memberships.groupId')), 'numMembers'],
            ]
        },
            group: 'Group.id'
        })

        return res.json({
          Group: allGroups,
        });
    }
  } else return res.json({ user: null });
});

// Get Group by groupId
// No preview boolean "GroupImages" due to different schema approach
router.get('/:groupId', requireAuth, async (req, res, next) => {
    const id = req.params.groupId

    const group = await Group.findOne({
        where: {
            id: id,
        },
        include: [{
            model: Image,
            as: 'GroupImages',
            attributes: ['id','url', ]
        },
        {
            model: User,
            as: 'Organizer',
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Venue,
            attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng'],

        },
        {
            model: Membership,
            attributes: []
        }
    ],
    })

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        return next(err)
    }

    const groupJSON = group.toJSON()
    const numMembers = await group.countMemberships({ where: { groupId: group.id}})

    groupJSON.numMembers = numMembers

    res.status(200).json(groupJSON)
})

// find all venues based on groupId
router.get('/:groupId/venues', requireAuth, async (req, res, next) => {
    const id = +req.params.groupId

    const group = await Group.findOne({
        where: {
            id: id
        }
    })

    if (!group) {
        const err = new Error("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    const user = await Membership.findOne({ where: { userId: req.user.id, groupId: group.organizerId}})

    if (user.status === 'co-owner' || user.id === group.organizerId) {

        const venues = await Venue.findAll({
            where: {
                groupId: group.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            group: 'id'
        })

        res.status(200).json({ Venues: venues })
    }
})

// Find all events by groupId
router.get('/:groupId/events', async (req, res, next) => {
    const { groupId } = req.params

    const group = await Event.findOne({ where: { id: groupId } });

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404
        return next(err)
    }
    const event = await Event.findAll({
        where: {
            groupId: group.id
        },
        include: [{
            model: Attendee,
            attributes: []
        },
        {
            model: Group,
            attributes: ['id','name','city','state']
        },
        {
            model: Venue,
            attributes: ['id', 'city', 'state']
        }],
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('Attendees.eventId')), 'numAttendees']]
        },
        group: 'Event.id'
    })

    res.json({Events: event })
})

// Create Group
router.post('/', requireAuth, validateGroupCreate, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;

    const group = await Group.create({
        organizerId: req.user.id, name, about, type, private, city, state
    });

    await Membership.create({ userId: req.user.id, groupId: group.id, status: 'owner'})

    const safeGroup = {
        id: group.id,
        organizerId: group.organizerId,
        name: group.name,
        about: group.about,
        type: group.type,
        private: group.private,
        city: group.city,
        state: group.state
    }

    res.status(201).json(safeGroup)
})

// Create image based on groupId
router.post('/:groupId/images', requireAuth, async (req, res, next) => {

    const id = req.params.groupId

    const { url, preview } = req.body
    const group = await Group.findOne({ where: { id: id } })

    if (!group) {
        const err = new Error("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    if (req.user.id === group.organizerId) {
        const image = await Image.create({ url, imageableType: 'Group', imageableId: group.id })

        const safeImage = {
            url: image.url,
            preview: preview
        }

        res.status(201).json(safeImage)
    }
})

// Create venue base on groupId
// NOTE : Need help with latitude and longitude validator
router.post('/:groupId/venues', requireAuth, validateVenue, async (req, res, next) => {
    const id = req.params.groupId
    const { address, city, state, lat, lng } = req.body
    const group = await Group.findOne({
        where: {
            id: id
        }
    })

    if (!group) {
        const err = new Error("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    const user = await  User.findOne({ where: { id: req.user.id}})

    if (user.status === 'co-owner' || user.id === group.organizerId) {

        const newVenue = await Venue.create({ groupId: group.id, address, city, state, lat, lng})

        const safeVenue = {
            id: newVenue.id,
            groupId: newVenue.groupId,
            address: newVenue.address,
            city: newVenue.city,
            state: newVenue.state,
            lat: newVenue.lat,
            lng: newVenue.lng
        }

        res.status(200).json(safeVenue)
    }
})

// Update groupId
router.put('/:groupId', requireAuth, validateGroupCreate, async (req, res, next) => {
    const groupId = req.params.groupId
    const { name, about, type, private, city, state } = req.body
    const group = await Group.findOne({ where: { id: groupId }})

    if (!group) {
        const err = new Error("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    if (req.user.id === group.organizerId) {

        if (name) group.name = name
        if (about) group.about = about
        if (type) group.type = type
        if (private) group.private = private
        if (city) group.city = city
        if (state) group.state = state

        res.status(200).json(group)
    }
})

// Delete by groupId
router.delete('/:groupId', requireAuth, async (req, res, next) => {

    const groupId = req.params.groupId
    const group = await Group.findOne({ where: { id: groupId }})

    if (!group) {
        const err = new Error("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    if (req.user.id === group.organizerId) {
        await group.destroy()

        res.status(200).json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    }
})

module.exports = router
