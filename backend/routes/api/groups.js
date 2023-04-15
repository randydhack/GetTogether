const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, } = require("../../utils/auth");
const { validateLogin, validateSignup } = require('../../utils/validation');
const { User, Group } = require("../../db/models");

router.get('/', async (req, res, next) => {
    const allGroups = await Group.findAll()

    res.status(200).json(allGroups)
})
