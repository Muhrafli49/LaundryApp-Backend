const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const Session = require('../models/wwebJsesion'); 
require('dotenv').config();

// Endpoint untuk mendapatkan QR code dalam format base64
router.get('/qr-code', async (req, res) => {
    try {
        const session = await Session.findOne({ sessionId: 'client-one' });
        if (session && session.qrCode) {
            // Konversi QR code menjadi base64
            const base64QR = await qrcode.toDataURL(session.qrCode);
            res.send(base64QR);
        } else {
            res.status(404).send('QR code not found');
        }
    } catch (error) {
        console.error('Error fetching QR code:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
