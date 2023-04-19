const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { validateGroupCreate, validateVenue } = require('../../utils/validation');
const { User, Group, Membership, Venue, Image } = require("../../db/models");

router.get('/', async (req, res, next) => {

})


module.exports = router
