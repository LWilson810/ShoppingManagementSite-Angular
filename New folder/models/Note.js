const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema ({
    bidderId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
    proposalPrice: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Note = mongoose.model('note', NoteSchema);