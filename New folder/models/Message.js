const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
  
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  state: {
    type: Boolean
  },
})

module.exports = Message = mongoose.model('message', MessageSchema);