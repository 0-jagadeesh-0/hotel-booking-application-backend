const bcrypt = require('bcrypt');
const GlobalConstants = require('../constants/global');

const hashPassword = (password) => {
    return bcrypt.hash(password, GlobalConstants.saltRounds);
};

const comparePassword = async (candidatePassword, password) => {
    return await bcrypt.compare(candidatePassword, password);
};

module.exports = { hashPassword, comparePassword };