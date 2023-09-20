const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  name:{
    type: String,
  },

  gender: {
    type: String,
  },

  userID: {
    type: String
  },

  email: {
    type: String
  },

  authority: {
    type: String
  },

  field: {
    type: String,
  },
  
  shop: {
    type: String,
  },

  birthday: {
    type: String
  },

  phone: {
    type: String
  },

  password: {
    type: String
  },

  
})

module.exports = User = mongoose.model('users', UserSchema);