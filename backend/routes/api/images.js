const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");
const { } = require('../../utils/validation');
const { Image, Group, Membership, Event } = require("../../db/models");

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params

    const image = await Image.findByPk(imageId)

    if (!image) {
        const err = new Error("Image couldn't be found")
        err.status = 404
        return next(err)
    }

    let organizerId;
    let groupId;

    if (image.imageableType === 'Group') {

        const group = await Group.findOne({ where: { id: image.imageableId }})
        organizerId = group.organizerId
        groupId = group.id

    } else if (image.imageableType === 'Event') {
        const event = await Event.findOne({
            where: {
                id: image.imageableId
            },
            include: {
                model: Group
            }
        });
        organizerId = event.Group.organizerId
        groupId = event.Group.id
    }

    const user = await Membership.findOne({where: { memberId: req.user.id, groupId }})

    if ((user && user.status === 'co-host') || (req.user.id === organizerId)) {

        await image.destroy();
        return res.json({ message: 'Successfully deleted', statusCode: 200 })

    } else {
        const err = new Error("User does not have permission")
        err.status = 403
        return next(err)
    }

})

module.exports = router;
