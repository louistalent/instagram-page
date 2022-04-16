const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function joinCheck(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.type = 'email';
    errors.msg = "Email field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.type = 'password';
    errors.msg = "Password field is required";
  }
  return {
    errors,
    isCheck: isEmpty(errors)
  };
};