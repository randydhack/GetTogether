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

    const user = await Membership.findOne({where: {memberId: req.user.id, groupId: image.imageableId}})
    const group = await Group.findOne({ where: { id: image.imageableId }})
    const event = await Event.findOne({ where: { id: image.imageableId }})


    if ((user && user.status === 'co-host') || (req.user.id === group.organizerId)) {

        if (image.imageableType === 'Group') {

            await image.destroy();
            return res.json({ message: 'Successfully deleted', statusCode: 200 })

       }

       if (image.imageableType === 'Event') {
            await image.destroy();
            return res.json({ message: 'Successfully deleted', statusCode: 200 })
        }

    } else {
        const err = new Error("User does not have permission")
        err.status = 403
        return next(err)
    }

})

module.exports = router;
