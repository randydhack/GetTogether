const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, } = require("../../utils/auth");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require("../../db/models");

// Validate Signup
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Invalid email"),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
    handleValidationErrors
  ];

// Validate Login
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const uniqueEmail = await User.findOne( { where: { email: email } } )

  if (uniqueEmail) {
    const err = new Error("User already exists");
    err.status = 403;
    err.title = "User already exists";
    err.errors = "User with that email already exists";
    return next(err);
  }

  const user = await User.create({ email, username, hashedPassword, firstName, lastName });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const token = await setTokenCookie(res, safeUser);

  safeUser.token = token;

  return res.status(200).json({
    user: safeUser,
  });
});

// Log in
router.post("/login", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Invalid credentials";
    return next(err);
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  const token = await setTokenCookie(res, safeUser);
  safeUser.token = token;

  return res.status(200).json({
    user: safeUser,
  });
});


// Delete token
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user / get current user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

module.exports = router;
