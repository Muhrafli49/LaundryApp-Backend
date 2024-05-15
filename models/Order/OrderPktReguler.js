const mongoose = require('mongoose');

const OrderPktRegulerSchema = new mongoose.Schema({
    noOrderReg: {
        type: String,
        required: false,
        unique: true
    },
    namaPelangganReg: {
        type: String,
        required: true
    },
    nomorTeleponReg: {
        type: String,
        required: true
    },
    alamatReg: {
        type: String,
        required: true
    },
    paketReg: {
        type: String,
        required: true
    },
    hargaPerKgReg: {
        type: Number,
        required: true
    },
    beratReg: {
        type: String,
        required: true
    },
    waktuKerjaReg: {
        type: Number,
        required: true
    },
    tglOrderReg: {
        type: Date,
        default: Date.now
    },
    tglSelesaiReg: {
        type: Date,
        required: true
    },
    keteranganReg: {
        type: String,
        required: true
    },
    totalBayarReg: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
}, { timestamps: true });

// Middleware sebelum menyimpan data
OrderPktRegulerSchema.pre('save', async function (next) {
    if (!this.noOrderReg) {
        // Menghasilkan nomor order dengan awalan "REG-" dan nomor unik empat digit
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.noOrderReg = `REG-${randomNum}`;
    }
    next();
});

module.exports = mongoose.model('OrderPktReguler', OrderPktRegulerSchema);
