const mongoose = require("mongoose");

const inappropriateDB = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
});

module.exports = mongoose.model("Inappropriate", inappropriateDB);