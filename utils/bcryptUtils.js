const bcrypt = require('bcrypt');
const GlobalConstants = require('../constants/global');

const hashPassword = (password) => {
    return bcrypt.hash(password, GlobalConstants.saltRounds);
};

const comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = { hashPassword, comparePassword };