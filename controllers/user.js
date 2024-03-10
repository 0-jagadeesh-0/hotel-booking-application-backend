const ErrorConstants = require('../constants/ErrorConstsnts');
const { INTERNAL_SERVER_ERROR_STATUS_CODE, SUCCESS_STATUS_CODE } = require('../constants/ResponseStatusCode');
const User = require('../models/user');

const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.status(SUCCESS_STATUS_CODE).send({
            data: { firstName: user.firstName, lastName: user.lastName, email: user.email, mobileNo: user.mobileNumber }
        })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        })
    }
}

module.exports = { getUserDetails }