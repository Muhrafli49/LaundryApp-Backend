// whatsappClient.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');
const Session = require('../models/wwebJsesion'); 
require('dotenv').config();

const wwebVersion = '2.2412.54';

// Koneksi ke MongoDB
mongoose.connect(process.env.DB_URL);

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'client-one',
        store: {
            save: async (session) => {
                await Session.findOneAndUpdate(
                    { sessionId: 'client-one' },
                    { sessionId: 'client-one', sessionData: session },
                    { upsert: true }
                );
            },
            load: async () => {
                const session = await Session.findOne({ sessionId: 'client-one' });
                return session ? session.sessionData : null;
            },
        },
    }),
    puppeteer: {}, // Konfigurasi puppeteer sesuai kebutuhan Anda
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', async (qr) => {
    console.log('QR code received, please scan:');
    qrcode.generate(qr, { small: true });

    await Session.findOneAndUpdate(
        { sessionId: 'client-one' },
        { qrCode: qr },
        { upsert: true }
    );
});

client.on('qrRefresh', qr => {
    console.log('QR code refreshed, please scan again:');
    qrcode.generate(qr, { small: true });
});

client.on('message_create', message => {
    console.log(message.body);
});

client.initialize();

module.exports = client;
