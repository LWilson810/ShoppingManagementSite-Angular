const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoggedUserSchema = new Schema ({

  userID: {
    type: String
  },
  
})

module.exports = LoggedUser = mongoose.model('logged_user', LoggedUserSchema);