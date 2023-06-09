const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");
const { validateVenue } = require("../../utils/validation");
const { Venue, Membership, Group } = require("../../db/models");

router.put("/:venueId", requireAuth, validateVenue, async (req, res, next) => {
  const id = req.params.venueId;
  const { address, city, state, lat, lng } = req.body;

  const venue = await Venue.findOne({ where: { id: id } });

  if (!venue) {
    const err = new Error("Venue couldn't be found")
    err.status = 404
    return next(err)
  }

  const user = await Membership.findOne({ where: { memberId: req.user.id }})

  const group = await Group.findOne({where: { id: venue.groupId }})

  if ((user && user.status === 'co-host') || (req.user.id === group.organizerId)) {
    await venue.update({
      address,
      city,
      state,
      lat,
      lng,
    });

    const safeVenue = {
      id: venue.id,
      groupId: venue.groupId,
      address,
      city,
      state,
      lat,
      lng,
    };
    res.json(safeVenue);
  } else {
    const err = new Error('User does not have permission')
    err.status = 403
    return next(err)
  }
});

module.exports = router;
