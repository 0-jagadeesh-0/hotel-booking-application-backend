const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingDetailsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    roomNo: {
        type: Number,
    },
    checkInDate: {
        type: Date
    },
    checkOutDate: {
        type: Date
    },
    bookingAmount: {
        type: Number
    }
}, { timestamps: true });

const BookingDetails = mongoose.model('BookingDetails', bookingDetailsSchema);

module.exports = BookingDetails;