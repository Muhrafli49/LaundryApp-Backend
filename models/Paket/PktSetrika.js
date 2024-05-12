const mongoose = require('mongoose');

const PktSetrikaSchema = new mongoose.Schema({
    namaPaket: {
        type: String,
        required: true
    },
    beratMin: {
        type: String,
    },
    waktuKerja: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
}, { timestamps: true }); 

module.exports = mongoose.model('PktSetrika', PktSetrikaSchema);
