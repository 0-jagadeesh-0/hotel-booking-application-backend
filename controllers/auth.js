const ErrorConstants = require('../constants/ErrorConstsnts');
const { BAD_REQUEST_STATUS_CODE, SUCCESS_STATUS_CODE, INTERNAL_SERVER_ERROR_STATUS_CODE, CREATION_SUCCESS_STATUS_CODE } = require('../constants/ResponseStatusCode');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const ResponseConstants = require('../constants/responseConstants');

const signup = async (req, res) => {
    const { firstName, lastName, email, mobileNumber, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(BAD_REQUEST_STATUS_CODE).send({
                message: ErrorConstants.USER_ALREADY_EXISTS
            });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            firstName,
            lastName,
            email,
            mobileNumber,
            password: hashedPassword
        });
        const token = generateToken(email);
        const user = await newUser.save();
        res.status(CREATION_SUCCESS_STATUS_CODE).send({
            message: ResponseConstants.USER_CREATION_MESSAGE,
            data: { userId: user._id, firstName, lastName, email, mobileNumber, token }
        });
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: ErrorConstants.INTERNAL_SERVER_ERROR
        });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user === null) {
            res.status(BAD_REQUEST_STATUS_CODE).send({ message: ErrorConstants.INVALID_EMAIL });
        }
        else {
            if (comparePassword(password, user.password)) {
                const token = generateToken(email);
                res.status(SUCCESS_STATUS_CODE).send({
                    message: ResponseConstants.USER_LOGIN_SUCCESS,
                    data: { userId: user._id, email, token }
                })
            }
            else {
                res.status(BAD_REQUEST_STATUS_CODE).send({ message: ErrorConstants.INVALID_PASSWORD });
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send(ErrorConstants.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { signup, signin }