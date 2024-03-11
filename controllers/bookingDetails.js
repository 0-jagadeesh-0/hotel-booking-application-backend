const ErrorConstants = require('../constants/ErrorConstsnts');
const { INTERNAL_SERVER_ERROR_STATUS_CODE, CREATION_SUCCESS_STATUS_CODE, SUCCESS_STATUS_CODE } = require('../constants/ResponseStatusCode');
const ResponseConstants = require('../constants/responseConstants');
const { getRandomRoom } = require('../helper/hotelHelper');
const BookingDetails = require('../models/bookingDetails');
const { getAvailableRoomsInHotel } = require('./hotel');

const addBookingDetails = async (req, res) => {
    try {
        const { userId, roomType, hotelId, checkInDate, checkOutDate, bookingAmount } = req.body;
        const availableRooms = await getAvailableRoomsInHotel(hotelId, checkInDate, checkOutDate);
        const filterRoomByType = availableRooms.filter(room => room.type === roomType);
        const allotedRoom = getRandomRoom(filterRoomByType);
        const newBooking = new BookingDetails({
            userId,
            roomNo: allotedRoom.number,
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
        const userId = req.params.userId;
        const bookingDetails = await BookingDetails.find({ userId: userId }).populate('hotelId');
        let bookings = [];
        bookingDetails.forEach(booking => {
            const bookingData = {
                bookingId: booking._id,
                checkin: booking.checkInDate,
                checkout: booking.checkOutDate,
                room: booking.hotelId.rooms[booking.roomNo],
                hotel: booking.hotelId.name,
                amount: booking.bookingAmount,
                bookingDate: booking.createdAt
            }
            bookings.push(bookingData);
        });
        res.status(SUCCESS_STATUS_CODE).send({
            data: bookings
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