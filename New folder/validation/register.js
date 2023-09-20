const isEmpty = require('./is-empty');
const Validator = require('validator');

const registerValidation = (data) => {
  let errors = {};
  data.userID = !isEmpty(data.userID) ? data.userID:"";
  data.password = !isEmpty(data.password) ? data.password:"";
  data.email = !isEmpty(data.email) ? data.email:"";
  data.password2 = !isEmpty(data.password2) ? data.password2:"";

  if(Validator.isEmpty(data.userID)) {
    errors.userID = "The user id field must be required."
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "The password field must be required."
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "The Email field must be required."
  } else if(!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid."
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "The password field must be required."
  } else if(!Validator.isLength(data.password, {min:6})) {
    errors.password = "The password must be over 6 characters."
  }

  // if(!Validator.isLength(data.password, {min:6})) {
    
  // }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = "The confirm password field must be required."
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match."
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const editRegisterValidation = data => {
  let errors = {};
  data.birthday = !isEmpty(data.birthday) ? data.birthday:"";
  data.work = !isEmpty(data.work) ? data.work:"";
  data.password = !isEmpty(data.password) ? data.password:"";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword:"";
  data.newpassword2 = !isEmpty(data.newpassword2) ? data.newpassword2:"";

  if(Validator.isEmpty(data.birthday)) {
    errors.birthday = "생년월일을 반드시 입력하십시오."
  }

  if(Validator.isEmpty(data.work)) {
    errors.work = "직장직위를 반드시 입력하십시오."
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "암호를 반드시 입력하십시오."
  }
  if(!(Validator.isEmpty(data.newpassword) && Validator.isEmpty(data.newpassword2))){
    if(!Validator.isLength(data.newpassword, {min:6})) {
      errors.newpassword = "암호는 6글자이상 되여야 합니다."
    }
  
    if(!Validator.equals(data.newpassword, data.newpassword2)) {
      errors.newpassword = "암호가 맞지 않습니다. 암호를 확인하십시오."
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
module.exports = {registerValidation, editRegisterValidation};

