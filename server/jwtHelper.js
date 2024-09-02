const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, email: user.email}, SECRET_KEY, {
            expiresIn: '1h'   
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = {generateToken, verifyToken};
