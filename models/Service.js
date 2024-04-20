const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kiloan: {
        type: String,
        required: true
    },
    satuan: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);