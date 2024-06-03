const express = require('express');
const router = express.Router();
const Session = require('../models/wwebJsesion');

// Endpoint untuk mendapatkan QR code
router.get('/get-qr/:id', async (req, res) => {
    try {
        const session = await Session.findOne({ sessionId: 'client-one' });
        if (!session || !session.qrCode) {
            return res.status(404).send('QR code not found');
        }
        res.json({ qrCode: session.qrCode });
    } catch (error) {
        res.status(500).send('Error fetching QR code');
    }
});

module.exports = router;
