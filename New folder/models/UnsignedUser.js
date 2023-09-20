const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnsignedUserSchema = new Schema ({
  name:{
    type: String,
  },

  gender: {
      type: String,
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

  
})

module.exports = UnsignedUser = mongoose.model('unsigned_users', UnsignedUserSchema);