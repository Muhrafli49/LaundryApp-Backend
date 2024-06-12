const { Client, LocalAuth } = require('whatsapp-web.js');
// const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');
// const Session = require('../models/wwebJsesion');
require('dotenv').config();
const wwebVersion = '2.2412.54';

let latestQRCode = '';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`, 
    },
});

async function generateQRCode(data) {
    return new Promise((resolve, reject) => {
        qrcode.generate(data, { small: true }, (qrcode) => {
            resolve(qrcode);
        }, (error) => {
            reject(error);
        });
    });
}

module.exports = { client, generateQRCode };