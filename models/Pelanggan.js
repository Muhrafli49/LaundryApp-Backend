const mongoose = require("mongoose");

const PelangganSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    telepon: {
        type: String,
        required: true,
        unique: true
    },
    alamat: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Pelanggan', PelangganSchema);
