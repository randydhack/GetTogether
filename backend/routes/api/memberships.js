const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { validateGroupCreate, validateVenue } = require('../../utils/validation');
const { User, Group, Membership, Venue, sequelize, Image } = require("../../db/models");

router.get('/:groupId', async (req, res, next) => {
    const { groupId } = req.params

    const group = await Group.findOne({ where: { id: groupId } });

    if (!group) {
        const err = new Error ("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    const coHost = await Membership.findOne({ where: { userId: req.user.id }})
    console.log(req.user.id, group.organizerId)
    if (req.user.id === group.organizerId || coHost.status === 'co-host') {

        const members = await Membership.findAll({
            where: {
                groupId: group.id
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                include: {
                    model: Membership,
                    attributes: ['status']
                }
            },
        })

        res.json(members)
    }
})

module.exports = router;
