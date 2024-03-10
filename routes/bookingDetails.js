const express = require("express");
const { addBookingDetails, getUserBookingDetails } = require("../controllers/bookingDetails");

const router = express.Router();

router.post("/add", addBookingDetails);

router.get("/history/:userId", getUserBookingDetails);

module.exports = router;