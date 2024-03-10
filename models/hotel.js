const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    location: {
        type: Object
    },
    rooms: {
        type: Array
    }
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;