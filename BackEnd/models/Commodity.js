const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommoditySchema = new Schema ({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    field: {
        type: String
    },
    shop: {
        type: String
    },
    stock: {
        type: Number
    },
    remain: {
        type: Number
    },
    comment: {
        type: Array
    },
    figures: {
        type: Array
    }
})

module.exports = Commodity = mongoose.model('commodity', CommoditySchema);