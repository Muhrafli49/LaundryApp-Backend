const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const wwebVersion = '2.2412.54';

const client = new Client({
    authStrategy: new LocalAuth({}),
    puppeteer: {},
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },
});

client.on('message_create', message => {
	console.log(message.body);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    console.log('QR code received, please scan:');
    qrcode.generate(qr, { small: true });
});

client.on('qrRefresh', qr => {
    console.log('QR code refreshed, please scan again:');
    qrcode.generate(qr, { small: true });
});

client.initialize();

module.exports = client;