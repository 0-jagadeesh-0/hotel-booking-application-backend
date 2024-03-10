const express = require("express");
const { getAllHotels, getHotelById, getAvailableHotelsBySelectionFilter, getHotelsByCity } = require("../controllers/hotel");

const router = express.Router();

router.get("/", getAllHotels);

router.get("/rooms/:hotelId", getAvailableHotelsBySelectionFilter);

router.get('/:hotelId', getHotelById);

router.get("/city/:cityId", getHotelsByCity);

module.exports = router;