const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = [];
    validationErrors
      .array()
      .forEach(error => errors.push(error.msg));

    const err = Error("Validation Error");
    err.status = 400;
    err.title = "Validation Error";
    err.errors = errors;
    next(err);
  }
  next();
};

// Validate Signup
const validateSignup = [
  check('email')
    .isEmail()
    .withMessage("Invalid email"),
   check('username')
    .isLength({min: 4})
    .withMessage('Please provide a username with at least 4 characters.'),
  check('password')
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
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Validate Create Group
const validateGroupCreate = [
  check('name')
    .isLength({ max: 60 })
    .withMessage('Name must be 60 characters or less'),
  check('about')
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more"),
  check('private')
    .isBoolean(true)
    .withMessage('Private must be a boolean'),
  check('type')
    .isIn(['Online', 'In Person'])
    .withMessage("Type must be 'Online' or 'In Person'"),
  check('city')
    .exists( {checkFalsy: true})
    .withMessage("City is required"),
  check('state')
    .exists( {checkFalsy: true})
    .withMessage("State is required"),
  handleValidationErrors
];

// validate venue
const validateVenue = [
  check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required'),
  check('city')
    .exists({checkFalsy: true})
    .withMessage('City is required'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('State is required'),
  check('lat')
    .isFloat({min: -90, max: 90})
    .withMessage('Latitude is not valid'),
  check('lng')
    .isFloat({min: -180, max: 180})
    .withMessage('Longitude is not valid'),
  handleValidationErrors
]

module.exports = {
  handleValidationErrors, validateLogin, validateSignup, validateGroupCreate, validateVenue
};
