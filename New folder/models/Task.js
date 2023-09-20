const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
  workerId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  worker: {
    type: String,
    required: true
  },
  bidStart: {
    type: String

  },
  limitPrice: {
    type: Number
  },
  bidEnd: {
    type: String

  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  attached_file: {
    type: String
  },

  views: {
    type: Number,
    default: 0
  },
  dueDate: {
    type: String
  },
  payment: {
    type: String
  },
  field: {
    type: String
  },

  success_bid: {
    type: Object
  },

  bids: {
    type: Array
  },

  status: {
    type: Number,
    default: 0
  },

  bidStart: {
  	type: String
  },

  bidEnd: {
  	type: String
  },

  limitPrice: {
  	type: Number
  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Task = mongoose.model('task', TaskSchema);