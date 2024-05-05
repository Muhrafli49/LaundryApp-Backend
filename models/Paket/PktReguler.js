const mongoose = require('mongoose');

const PktRegulerSchema = new mongoose.Schema({
    namaPaket: {
        type: String,
        required: true
    },
    beratMin: {
        type: String,
    },
    waktuKerja: {
        type: Number,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('PktReguler', PktRegulerSchema);

