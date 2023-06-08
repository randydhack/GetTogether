const { validationResult } = require('express-validator');
const { check, query } = require('express-validator');
const { Venue } = require('../db/models')
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

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
    .withMessage('Username must be 4 characters or more'),
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
    .isLength({ min: 3 ,max: 60 })
    .withMessage('Name must be 60 characters or less'),
  check('about')
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more"),
  check('private')
    .isBoolean(true)
    .withMessage('Private must be a boolean'),
  check('type')
    .isIn(['Online', 'In person'])
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
];

const validateEvent = [
  check('venueId')
    .isInt()
    .withMessage('Venue does not exist'),
  check('name')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters'),
  check('type')
    .isIn(['Online', 'In person'])
    .withMessage('Type must be Online or In person'),
  check('capacity')
    .isInt()
    .withMessage('Capacity must be an integer'),
  check('price')
    .isDecimal()
    .withMessage('Price is invalid'),
  check('description')
    .isLength({ min: 30 })
    .withMessage('Description must be at least 30 characters long'),
  check('startDate')
    .custom((value, {req})=> {
      const date = new Date()
      return new Date(value) > date
    })
    .withMessage('Start date must be in the future'),
  check('endDate')
  .custom((value, {req})=> {
    return value > req.body.startDate
  })
    .withMessage('End date is less than start date'),
  handleValidationErrors
]

const paginationValidation = [
  query('page')
    .optional()
    .isInt({min: 0})
    .withMessage("Page must be greater than or equal to 0"),
  query('size')
    .optional()
    .isInt({min: 0})
    .withMessage("Size must be less than or equal to 20"),
  query('name')
    .optional()
    .custom((value, {req}) => {
      return value.length
    })
    .withMessage("Name must be a string"),
  query('startDate')
    .optional()
    .isTime()
    .withMessage("Start date must be a valid datetime"),
  query('type')
    .optional()
    .isIn(['Online', 'In-Person'])
    .withMessage("Type must be 'Online' or 'In Person'"),
    handleValidationErrors
]

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateGroupCreate,
  validateVenue,
  validateEvent,
  paginationValidation
};
