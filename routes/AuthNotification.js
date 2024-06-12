const express = require('express');
const router = express.Router();
// const { Client, LocalAuth } = require('whatsapp-web.js');
const { client, generateQRCode } = require('../controllers/notificationsControllers');
// const qrcode = require('qrcode');
require('dotenv').config();



router.get('/qr-code', async (req, res) => {
    try {
        client.getState('connection').then(connectionStatus => {
            if (connectionStatus !== 'CONNECTED') {
                client.on('qr', async (qr) => {
                    try {
                        const qrcodeData = await generateQRCode(qr);
                        res.send(`<div id="qrcode-container"><pre>${qrcodeData}</pre></div>`);
                    } catch (error) {
                        console.error(error);
                        res.status(500).send('Internal Server Error');
                    } finally {
                        client.removeAllListeners('qr');
                    }
                });
            } else {
                res.send(`<div id="success-message">You are now logged in! Connection Status: ${JSON.stringify(connectionStatus)}</div>`);
                console.log(`QR Code scanned successfully. You are now authenticated. Connection Status: ${connectionStatus}`);
            }
        });
    } catch (error) {
        res.send(`<div id="error-message">Error: ${error.message}</div>`);
    }
});

client.on('authenticated', (session) => {
    console.log(`You are now authenticated. Session: ${JSON.stringify(session)}`);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

module.exports = router;
