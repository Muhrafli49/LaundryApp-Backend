const mongoose = require('mongoose');

const OrderPktExpressSchema = new mongoose.Schema({
    noOrderExp: {
        type: String,
        required: false,
        unique: true
    },
    namaPelangganExp: {
        type: String,
        required: true
    },
    nomorTeleponExp: {
        type: String,
        required: true
    },
    alamatExp: {
        type: String,
        required: true
    },
    paketExp: {
        type: String,
        required: true
    },
    hargaPerKgExp: {
        type: Number,
        required: true
    },
    beratExp: {
        type: String,
        required: true
    },
    waktuKerjaExp: {
        type: Number,
        required: true
    },
    tglOrderExp: {
        type: Date,
        default: Date.now
    },
    tglSelesaiExp: {
        type: Date,
        required: true
    },
    keteranganExp: {
        type: String,
        required: true
    },
    totalBayarExp: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
}, { timestamps: true });

// Middleware sebelum menyimpan data
OrderPktExpressSchema.pre('save', async function (next) {
    if (!this.noOrderExp) {
        // Menghasilkan nomor order dengan awalan "EXP-" dan nomor unik empat digit
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.noOrderExp = `EXP-${randomNum}`;
    }
    next();
});

module.exports = mongoose.model('OrderPktExpress', OrderPktExpressSchema);
