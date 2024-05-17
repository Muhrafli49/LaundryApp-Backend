const mongoose = require('mongoose');

const PengajuanBarangSchema = new mongoose.Schema({
    noPengajuan: {
        type: String,
        required: false,
        unique: true
    },
    jenisBarang: {
        type: String,
        required: true
    },
    jumlah: {
        type: String,
        required: true
    },
    merk: {
        type: String,
        required: true
    },
    hargaSatuan: {
        type: String,
        required: true
    },
    totalHarga: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
}, { timestamps: true });


PengajuanBarangSchema.pre('save', async function (next) {
    if (!this.noPengajuan) {
        // Menghasilkan nomor pengajuan dengan awalan "PENG-" dan nomor unik empat digit
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.noPengajuan = `INV-${randomNum}`;
    }
    next();
});

module.exports = mongoose.model('PengajuanBarang', PengajuanBarangSchema);
