const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const {
  requireAuth,
} = require("../../utils/auth");
const {

} = require("../../utils/validation");
const {
  User,
  Group,
  Membership,
} = require("../../db/models");

// ---------------- GET ENDPOINTS -------------------------

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

  if ((coHost && coHost.status === 'co-host') || (req.user.id === group.organizerId)) {
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

// ---------------- POST ENDPOINTS -------------------------

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

// ---------------- UPDATE ENDPOINTS -------------------------

// updated member's status
router.put('/:groupId', requireAuth, async (req, res, next) => {
    const { groupId } = req.params
    const { memberId, status } = req.body

    // find group by groupId then check if it exist
    const group = await Group.findOne({where: { id: groupId }})
    if (!group) {
        const err = new Error("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    // if status is pending, throw error
    if (status === 'pending') {
        const err = new Error('Validations Error')
        err.status = 400
        err.errors = { status: "Cannot change a membership status to pending"}
        return next(err)
    }

    const coHost = await Membership.findOne({where: { memberId: req.user.id, groupId: groupId }})
    const member = await Membership.findOne({where: { memberId: memberId, groupId } })

    // check if user is a member
    if (!member) {
        const err = new Error('Validation Error')
        err.status = 400
        err.errors = { status: "User couldn't be found"}
        return next(err)
    }

    if (member.status === status) {
        const err = new Error('Validation Error')
        err.status = 400
        err.errors = { status: "User already have that status"}
        return next(err)
    }

    // checks if belong to that group
    if (member.groupId !== group.organizerId) {
        const err = new Error("Membership between the user and the group does not exists")
        err.status = 400
        return next(err)
    }

    if ((coHost && coHost.status === 'co-host') || (req.user.id === group.organizerId)) {

        if (member.status === 'pending') {
            await member.update({ memberId, status})
            const safeStatus = { id: member.id, groupId, memberId, status }
            res.status(200).json(safeStatus)
        }

        if (req.user.id === group.organizerId && member.status === 'member' && status === 'co-host') {
            await member.update({ memberId, groupId, status })
            const safeStatus = { id: member.id, groupId, memberId, status }
            res.status(200).json(safeStatus)
        }
    } else {
        const err = new Error('User does not have permission')
        err.status = 403
        return next(err)
    }
});

// ---------------- DELETE ENDPOINTS -------------------------

router.delete('/:groupId', requireAuth, async (req, res, next) => {
    const { groupId } = req.params
    const { memberId } = req.body

    const group = await Group.findOne({ where: { id: groupId }})
    const user = await User.findOne({where: {id: memberId}})
    const member = await Membership.findOne({ where: { memberId: memberId, groupId: group.organizerId}})

    // throw error if group does not exist
    if (!group) {
        const err = new Error("Group couldn't be found")
        err.status = 404
        return next(err)
    }

    // if user does not exist
    if(!user) {
        const err = new Error("Validation Error")
        err.status = 400
        err.errors = { memberId: "User couldn't be found"}
        return next(err)
    }

    // throw error if they are not a member
    if(!member) {
        const err = new Error("Membership does not exist for this User")
        err.status = 404
        return next(err)
    }

    // if user is organizer or user, delete membership
    if (req.user.id === group.organizerId || member.groupId === group.organizerId) {
        await member.destroy()
        res.status(200).json({ message: 'Successfully deleted membership from group' })
    } else {
        const err = new Error("User does not have permission")
        err.status = 403
        return next(err)
    }
});

module.exports = router;
