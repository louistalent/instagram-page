const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function regiCheck(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.name = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.type = "password";
    errors.msg = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.type = "password";
    errors.msg = "Password must be at least 6 characters";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.type = "email";
    errors.msg = "Email or Mobile Number field is required";
  }
  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.type = "username";
    errors.msg = "UserName field is required";
  }
  if (Validator.isEmpty(data.fullname)) {
    errors.type = "fullname";
    errors.msg = "FullName field is required";
  }
  return {
    errors,
    isCheck: isEmpty(errors)
  };
};