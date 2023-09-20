const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FieldSchema = new Schema ({
    field: {
        type: String
    },

    shopList: [
        {
            shop: {
                type: String
            }
        }
    ]
})

module.exports = Field = mongoose.model('field', FieldSchema);