const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  console.log(validationErrors)
  if (!validationErrors.isEmpty()) {
    const errors = [];
    validationErrors
      .array()
      .forEach(error => errors.push(error.msg));

    const err = Error("Validation Error");
    err.status = 400;
    err.messages = "Validation Error";
    err.errors = errors;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
