const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  validateGroupCreate,
  validateVenue,
} = require("../../utils/validation");
const {
  User,
  Group,
  Membership,
  Venue,
  sequelize,
  Image,
} = require("../../db/models");


// Get all members by groupId
router.get("/:groupId", async (req, res, next) => {
  const { groupId } = req.params;

  const group = await Group.findOne({ where: { id: groupId } });

  if (!group) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    return next(err);
  }

  const coHost = await Membership.findOne({ where: { memberId: req.user.id } });

  if (req.user.id === group.organizerId || coHost.status === "co-host") {
    const members = await User.findAll({
      include: {
        model: Membership,
        where: { groupId: group.id },
        attributes: [],
      },
      attributes: {
        exclude: ["username"],
      },
      raw: true,
    });

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      member.Memberships = await Membership.findOne({
        where: {
          memberId: member.id,
          groupId: group.id,
        },
        attributes: ["status"],
      });
    }

    res.json({ Members: members });
  } else {
    const members = await User.findAll({
      include: {
        model: Membership,
        where: { groupId: group.id, status: { [Op.notIn]: ["pending"] } },
        attributes: [],
      },
      attributes: {
        exclude: ["username"],
      },
      raw: true,
    });

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      member.Membership = await Membership.findOne({
        where: {
          memberId: member.id,
          groupId: group.id,
        },
        attributes: ["status"],
      });
    }

    res.json({ Members: members });
  }
});

// Request to join a group by groupId
router.post("/:groupId", requireAuth, async (req, res, next) => {
  const { groupId } = req.params;
  const group = await Group.findOne({ where: { id: groupId } });

  if (!group) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    return next(err);
  }

  const checkMembership = await Membership.findOne({
    where: { memberId: req.user.id, groupId: group.id },
  });


  if (!checkMembership || checkMembership.groupId !== group.id || checkMembership.memberId === null) {

      const requestMembership = await Membership.create({
        groupId: group.id,
        memberId: req.user.id,
        status: "pending",
      });

      const safeRequest = {
        groupId: requestMembership.groupId,
        memberId: requestMembership.memberId,
        status: requestMembership.status,
      };

      res.status(200).json(safeRequest);

  } else {
    if (checkMembership.status === "pending") {
      const err = new Error("Membership has already been requested");
      err.status = 400;
      return next(err);
    }

    if (
      checkMembership.status === "co-host" ||
      checkMembership.status === "member" ||
      req.user.id === group.organizerId
    ) {
      const err = new Error("User is already a member of the group");
      err.status = 400;
      return next(err);
    }
  }
});

module.exports = router;
