const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const { requireAuth, } = require("../../utils/auth");
const { validateGroupCreate, validateVenue, validateEvent } = require('../../utils/validation');
const { User, Group, Membership, Venue, sequelize, Image, Event, Attendee} = require("../../db/models");

router.get('/:eventId', async (req, res, next) => {
    const { user } = req
    const { eventId } = req.params

    const attendees = await Attendee.findAll({
         where: {
            eventId: eventId
        }
    });

})

module.exports = router
