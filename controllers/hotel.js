const ErrorConstants = require('../constants/ErrorConstsnts');
const { INTERNAL_SERVER_ERROR_STATUS_CODE, SUCCESS_STATUS_CODE } = require('../constants/ResponseStatusCode');
const GlobalConstants = require('../constants/global');
const BookingDetails = require('../models/bookingDetails');
const Hotel = require('../models/hotel');

const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(SUCCESS_STATUS_CODE).send(hotels);
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        })
    }
}

const getHotelById = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await Hotel.findById(hotelId);
        res.status(SUCCESS_STATUS_CODE).send(hotel);
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        })
    }
}


const getAvailableRoomsInHotel = async (hotelId, checkInDate, checkOutDate) => {
    const bookingDetailsByHotelId = await BookingDetails.find({
        hotelId: hotelId,
        checkInDate: { $lte: new Date(checkOutDate) },
        checkOutDate: { $gte: new Date(checkInDate) }
    });
    const unavailableRooms = [...new Set(bookingDetailsByHotelId.map(booking => {
        return booking.roomNo;
    }))];
    const hotelDetails = await Hotel.findById(hotelId);
    const rooms = hotelDetails.rooms;
    const availableRooms = rooms.filter(room => !unavailableRooms.includes(room.number));
    return availableRooms;
}


const getAvailableHotelsBySelectionFilter = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const checkInDate = req.query.checkInDate;
        const checkOutDate = req.query.checkInDate;
        const availableRooms = await getAvailableRoomsInHotel(hotelId, checkInDate, checkOutDate);
        res.status(SUCCESS_STATUS_CODE).send(availableRooms);
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        })
    }
}

const getHotelsByCity = async (req, res) => {
    try {
        const cityId = req.params.cityId;
        console.log(req.params);
        const city = GlobalConstants.cityMap[cityId];
        const hotels = await Hotel.find();
        const filterByCities =
            hotels.filter(hotel => hotel.location.city === city);
        res.status(SUCCESS_STATUS_CODE).send({
            data: filterByCities
        })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        })
    }
}

module.exports = { getAllHotels, getHotelById, getAvailableHotelsBySelectionFilter, getHotelsByCity, getAvailableRoomsInHotel };