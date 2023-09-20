const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function loginValidation (data) {
  let errors = {};
  data.userID = !isEmpty(data.userID) ? data.userID:"";
  data.password = !isEmpty(data.password) ? data.password:"";

  if(Validator.isEmpty(data.userID)) {
    errors.userID = "Please enter your user ID."
  }
  
  if(Validator.isEmpty(data.password)) {
    errors.password = "Please enter your password."
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
} 

