const bcrypt = require('bcrypt');

const generateHash = async (password) => {
    return bcrypt.hash(password, 10);
}

const compareHash = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}

export default {
    generateHash,
    compareHash,
};