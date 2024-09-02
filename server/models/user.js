const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userDB = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("User", userDB);