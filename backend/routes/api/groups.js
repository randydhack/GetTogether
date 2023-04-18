const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { validateGroupCreate } = require('../../utils/validation');
const { User, Group, Membership, Venue, sequelize, Image } = require("../../db/models");

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
            username: user.username
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
                organizerId: groupId.groupId
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
    const id = +req.params.groupId

    const group = await Group.findOne({
        where: {
            id: id
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
            attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
        },
        {
            model: Membership,
            attributes: []
        }
        ],
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('Memberships.groupId')), 'numMembers']]
        },
    })

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        return next(err)
    }

    const groupJSON = group.toJSON()
    const numMembers = await group.countMemberships()
    groupJSON.numMembers = numMembers

    res.status(200).json(groupJSON)
})

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
    console.log('++++++++++++++++++++++++', 'WE GOT HERE!!!!!!' , '++++++')
    const id = req.params.groupId

    console.log('++++++++++++++++++++++++', id , '++++++')
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
