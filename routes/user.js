const express = require("express");
const { getUserDetails } = require("../controllers/user");

const router = express.Router();

router.get("/getDetails/:userId", getUserDetails);

module.exports = router;