const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");
const {
  validateEvent,
  paginationValidation,
} = require("../../utils/validation");
const {
  Group,
  Venue,
  Image,
  Event,
  Attendee,
  Membership,
  sequelize,
  User,
} = require("../../db/models");

// ------------------ GET ENDPOINTS -----------------------

// Get all events
router.get("/", paginationValidation, async (req, res, next) => {
  const where = {};
  const pagination = {};

  let { name, type, startDate, page, size } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  if (!page) page = 0;
  if (!size) size = 20;
  if (page > 10) page = 10;
  if (size > 20) size = 20;

  pagination.limit = size;
  pagination.offset = size * page;

  // name, type, startDate
  if (name) {
    if (name.includes("-")) name = name.split("-").join(" ");
    where.name = { [Op.like]: `%${name}%` };
  }
  if (type) {
    if (type.includes("-")) type = type.split("-").join(" ");
    where.type = type;
  }
  if (startDate) where.startDate = { [Op.gte]: new Date(startDate) };

  const events = await Event.findAll({
    where,
    include: [
      {
        model: Group,
        attributes: ["id", "name", "city", "state"],
      },
      {
        model: Attendee,
        attributes: [],
      },
      {
        model: Venue,
        attributes: ["id", "city", "state"],
      },
      {
        model: Image,
        as: "EventImages",
        attributes: ["id", "url", "preview"],
      },
    ],
    attributes: {
      exclude: ["price", "capacity"],
    },
    group: ["Event.id", 'EventImages.id'],
    ...pagination,
  });

  const eventArr = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventJSON = event.toJSON();

    eventJSON.previewImage = eventJSON.EventImages[0] ? eventJSON.EventImages[0].url : null;
    eventJSON.numAttending = await event.countAttendees();
    eventArr.push(eventJSON);
  }

  res
    .status(200)
    .json({ Events: eventArr, page: page, size: pagination.limit });
});

// get event by eventID
router.get("/:eventId", async (req, res, next) => {
  const { eventId } = req.params;
  const eventCheck = await Event.findOne({ where: { id: eventId } });

  if (!eventCheck) {
    const err = new Error("Event couldn't be found");
    err.status = 404;
    return next(err);
  }

  const event = await Event.findOne({
    where: {
      id: eventId,
    },
    include: [
      {
        model: Group,
        attributes: ["id", "name", "private", "city", "state"],
        include: [{
          model: User,
          as: "Organizer",
          attributes: ["id", "firstName", "lastName"]
        },
          {
          model: Image,
          as: "GroupImages",
          attributes: ["id", "url", "preview"],
          }
        ],
      },
      {
        model: Venue,
        attributes: {
          exclude: ["groupId", "createdAt", "updatedAt"],
        },
      },
      {
        model: Image,
        as: "EventImages",
        attributes: ["id", "url", "preview"],
      },
      {
        model: Attendee,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Attendees.id")), "numAttendees"],
      ],
    },
    group: ["Event.id", "Group.id", "Venue.id", 'GroupImages.id'],
  });

  const eventJSON = event.toJSON();

  eventJSON.previewImage = eventJSON.EventImages[0] ? eventJSON.EventImages[0].url : null;

  res.status(200).json(eventJSON);
});

// ------------------ POST ENDPOINTS -----------------------

// Add image to event by eventId
// NOTE: preview will not part of the image table
router.post("/:eventId/images", requireAuth, async (req, res, next) => {
  const { eventId } = req.params;
  const { url, preview } = req.body;
  const event = await Event.findOne({ where: { id: eventId } });
  const user = await Attendee.findOne({ where: { userId: req.user.id } });
  const group = await Group.findOne({ where: { organizerId: req.user.id } });

  if (!event) {
    const err = new Error("Event couldn't be found");
    err.status = 404;
    return next(err);
  }

  if ((user && user.eventId === event.id) || group.organizerId === user.id) {
    const image = await Image.create({
      url,
      imageableType: "Event",
      imageableId: event.id,
      preview,
    });
    const safeImage = {
      id: image.id,
      url: image.url,
    };
    res.status(200).json(safeImage);
  } else {
    const err = new Error("User is not associate with the event");
    err.status = 403;
    return next(err);
  }
});

// ------------------ PUT ENDPOINTS -----------------------

router.put("/:eventId", requireAuth, validateEvent, async (req, res, next) => {
  const { eventId } = req.params;
  const {
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,
  } = req.body;

  const event = await Event.findOne({ where: { id: eventId } });
  const venue = await Venue.findOne({ where: { id: venueId } });

  if (!venue) {
    const err = new Error("Venue couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (!event) {
    const err = new Error("Event couldn't be found");
    err.status = 404;
    return next(err);
  }

  const group = await Group.findOne({ where: { id: event.groupId } });
  const user = await Membership.findOne({ where: { memberId: req.user.id } });

  if (
    (user && user.status === "co-host") ||
    req.user.id === group.organizerId
  ) {
    await event.update({
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    });
    const safeEvent = {
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    };
    res.json(safeEvent);
  } else {
    const err = new Error("User does not have permission");
    err.status = 403;
    return next(err);
  }
});

router.delete("/:eventId", requireAuth, async (req, res, next) => {
  const { eventId } = req.params;

  const user = await Membership.findOne({ where: { memberId: req.user.id } });
  const event = await Event.findOne({ where: { id: eventId } });

  if (!event) {
    const err = new Error("Event couldn't be found");
    err.status = 404;
    return next(err);
  }

  const group = await Group.findOne({ where: { id: event.groupId } });

  if (
    (user && user.status === "co-host") ||
    req.user.id === group.organizerId
  ) {
    await event.destroy();

    res.status(200).json({
      message: "Successfully deleted",
    });
  } else {
    const err = new Error("User does not have permission");
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
