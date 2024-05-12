const mongoose = require('mongoose');

const OrderPktSetrikaSchema = new mongoose.Schema({
    noOrderStr: {
        type: String,
        required: false,
        unique: true
    },
    namaPelangganStr: {
        type: String,
        required: true
    },
    nomorTeleponStr: {
        type: String,
        required: true
    },
    alamatStr: {
        type: String,
        required: true
    },
    paketStr: {
        type: String,
        required: true
    },
    hargaPerKgStr: {
        type: Number,
        required: true
    },
    beratStr: {
        type: String,
        required: true
    },
    waktuKerjaStr: {
        type: String,
        required: true
    },
    tglOrderStr: {
        type: Date,
        default: Date.now
    },
    tglSelesaiStr: {
        type: Date,
        required: true
    },
    keteranganStr: {
        type: String,
        required: true
    },
    totalBayarStr: {
        type: Number,
        required: true
    },
}, { timestamps: true });

// Middleware sebelum menyimpan data
OrderPktSetrikaSchema.pre('save', async function (next) {
    if (!this.noOrderStr) {
        // Menghasilkan nomor order dengan awalan "STR-" dan nomor unik empat digit
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.noOrderStr = `STR-${randomNum}`;
    }
    next();
});

module.exports = mongoose.model('OrderPktSetrika', OrderPktSetrikaSchema);
