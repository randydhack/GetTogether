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


    if (req.user.id === group.organizerId || coHost.status === 'co-host') {

        const members = await User.findAll({
            include: {
                model: Membership,
                where: { groupId: group.id },
                attributes: []
            },
            attributes: {
                exclude: ['username']
            },
            raw: true
        })

        for (let i = 0; i < members.length; i++) {
            const member = members[i]
            member.Memberships = await Membership.findOne({
                where: {
                    userId: member.id,
                    groupId: group.id
                },
                 attributes: ['status']
                })
            }

        res.json({ Members: members })
    } else {

        const members = await User.findAll({
            include: {
                model: Membership,
                where: { groupId: group.id, status: { [Op.notIn]: ['pending']} },
                attributes: []
            },
            attributes: {
                exclude: ['username']
            },
            raw: true
        })

        for (let i = 0; i < members.length; i++) {
            const member = members[i]
            member.Membership = await Membership.findOne({
                where: {
                    userId: member.id,
                    groupId: group.id
                },
                 attributes: ['status']
                })
            }

        res.json({ Members: members })
    }
})

module.exports = router;
