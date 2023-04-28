const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const { requireAuth, } = require("../../utils/auth");
const { validateGroupCreate, validateVenue, validateEvent } = require('../../utils/validation');
const { User, Group, Membership, Venue, sequelize, Image, Event, Attendee} = require("../../db/models");

// ---------------- GET ENDPOINTS -------------------------

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

// Get all groups or organized by currentUser
router.get("/currentUser", requireAuth, async (req, res, next) => {
    const { user } = req;
  if (user) {
    const currentUser = await User.findOne({
        where: {
            id: user.id
        }
    })

        // find all groups owned
        const ownedGroups = await Group.findAll({
            where: {
                organizerId: currentUser.id
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
                [sequelize.fn('COUNT', sequelize.col('Memberships.memberId')), 'numMembers'],
            ]
        },
            group: 'Group.id'
        })

        // find all groups joined
        const joinedGroups = await Group.findAll({
            include: [{
                model: Membership,
                attributes: [],
                where: {
                    memberId: currentUser.id,
                    status: {
                        [Op.in]: ['co-host', 'member']
                    }
                }
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
          Group: [...ownedGroups,...joinedGroups]
        });
    }

    return res.json({ user: null });
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

    const user = await Membership.findOne({ where: { memberId: req.user.id, groupId: group.organizerId}})

    if ((user && user.status === 'co-host') || req.user.id === group.organizerId) {

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

    const groups = await Group.findOne({ where: { id: groupId } });

    if (!groups) {
        const err = new Error("Group couldn't be found");
        err.status = 404
        return next(err)
    }

    const event = await Event.findAll({
        where: {
            groupId: groups.id
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
            include: [[sequelize.fn('COUNT', sequelize.col('Attendees.id')), 'numAttendees']],
            exclude: ['price', 'capacity', 'description']
        },
        group: 'Event.id'
    })

    res.json({Events: event })
})

// ---------------- POST ENDPOINTS -------------------------

// Create Group
router.post('/', requireAuth, validateGroupCreate, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;

    const group = await Group.create({
        organizerId: req.user.id, name, about, type, private, city, state
    });

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

    const user = await Membership.findOne({ where: { id: req.user.id }})

    if ((user && user.status === 'co-host') || user.id === group.organizerId) {

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
    } else {
        const err = new Error('User does not have permission')
        err.status = 403
        return next(err);
    }
});

// Created Event for a group by it's id
router.post('/:groupId/events', requireAuth, validateEvent, async (req, res, next) => {
    const { groupId } = req.params
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    const findGroup = await Group.findOne({ where: { id: groupId }})
    const user = await Membership.findOne({ where: { memberId: req.user.id}})
    const venue = await Venue.findByPk(venueId)

    if (!findGroup) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        return next(err)
    }

    if ((user && user.status === 'co-host') || (req.user.id === findGroup.organizerId)) {
        const event = await Event.create({groupId: findGroup.id, venueId, name, type, capacity, price, description, startDate, endDate})

        const safeEvent = {
            id: event.id, groupId: findGroup.id, venueId, name, type, capacity, price, description, startDate, endDate
        }

        res.status(200).json(safeEvent)
    } else {
        const err = new Error('User does not have permission');
        err.status = 403
        return next(err)
    }
})

// ---------------- UPDATE ENDPOINTS -------------------------

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
    } else {
        const err = new Error("User does not have permission")
        err.status = 403
        return next(err)
    }
})

// ---------------- DELETE ENDPOINTS -------------------------

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
