const express = require('express');
const router = express.Router();
const { eventEmitter } = require('../controllers/notificationsControllers');

let latestQrCode = '';

// Endpoint untuk mendapatkan QR code
router.get('/qr-code', (req, res) => {
    if (latestQrCode) {
        res.send(`
                <img src="${latestQrCode}">`);
    } else {
        res.status(404).send('QR code not available'); // Atau respons lain jika QR code tidak tersedia
    }
});

// Event listener untuk menangkap QR code yang dikirim melalui eventEmitter
eventEmitter.on('qrCode', (qrCode) => {
    latestQrCode = qrCode;
    console.log('QR code received:', qrCode); // Tambahkan logging di sini
});

module.exports = router;
