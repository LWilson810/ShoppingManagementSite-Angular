const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BidSchema = new Schema ({
  bidderId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  projectId: {
    type: String,
    required: true
  },
  bidderName: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  payment: {
    type: String
  },
  attached_file: {
    type: String
  },
  status: {
    type: Boolean,
    default:false
  },
  proposalPrice: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Bid = mongoose.model('bid', BidSchema);