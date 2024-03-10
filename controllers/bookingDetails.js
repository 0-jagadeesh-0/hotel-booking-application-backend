const ErrorConstants = require('../constants/ErrorConstsnts');
const { INTERNAL_SERVER_ERROR_STATUS_CODE, CREATION_SUCCESS_STATUS_CODE, SUCCESS_STATUS_CODE } = require('../constants/ResponseStatusCode');
const ResponseConstants = require('../constants/responseConstants');
const BookingDetails = require('../models/bookingDetails');

const addBookingDetails = async (req, res) => {
    try {
        const { userId, roomId, hotelId, checkInDate, checkOutDate, bookingAmount } = req.body;
        const newBooking = new BookingDetails({
            userId,
            roomNo,
            hotelId,
            checkInDate,
            checkOutDate,
            bookingAmount
        });
        await newBooking.save();
        res.status(CREATION_SUCCESS_STATUS_CODE).send({
            message: ResponseConstants.USER_CREATION_MESSAGE
        });
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        })
    }
};

const getUserBookingDetails = async (req, res) => {
    try {
        const { userId } = req.params.userId;
        const bookingDetails = await BookingDetails.find({ userId: userId });
        res.status(SUCCESS_STATUS_CODE).send({
            data: bookingDetails
        });
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        });
    }
};

module.exports = { addBookingDetails, getUserBookingDetails };