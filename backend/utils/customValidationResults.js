const { validationResult } = require("express-validator");

const customValidationResults = validationResult.withDefaults({
  formatter: (error) => ({
    message: error.msg,
    field: error.path,
  }),
});

const checkIfValidationError = (req) => {
  const errors = customValidationResults(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.statusCode = 422;
    error.body = {
      success: false,
      message: "Invalid data provided",
      errors: errors.array(),
    };
    throw error;
  }
};

module.exports = {
  // customValidationResults,
  checkIfValidationError,
};
