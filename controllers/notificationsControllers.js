const { makeWASocket, DisconnectReason } = require('@whiskeysockets/baileys');
const { useMultiFileAuthState } = require('baileys');
const pino = require('pino');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
let socket;

const kirimPesan = async (nomor, pesan) => {
    await socket.sendMessage(nomor, { text: pesan });
}

// Fungsi formatPhoneNumber diintegrasikan di sini
const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('0')) {
        return `62${phoneNumber.slice(1)}`;
    }
    return phoneNumber;
};

async function initializeWhatsApp() {
    try {
        const auth = await useMultiFileAuthState("session");

        socket = makeWASocket({
            printQRInTerminal: true,
            browser: ["Rapl", "1.0.0"],
            auth: auth.state,
            logger: pino({ level: "silent" }),
        });

        socket.ev.on("qr", (qrCode) => {
            eventEmitter.emit('qrCode', qrCode);
        });

        socket.ev.on("creds.update", auth.saveCreds);

        socket.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "open") {
                console.log("Bot WhatsApp Siap");
                eventEmitter.emit('connectionStatus', 'ready');
            } else if (connection === "close") {
                console.log("Koneksi terputus, mencoba untuk menyambung kembali...");
                eventEmitter.emit('connectionStatus', 'disconnected');
                if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                    // Tambahkan jeda waktu sebelum mencoba menginisialisasi ulang
                    setTimeout(initializeWhatsApp, 5000);
                } else {
                    console.log("Logged out from WhatsApp");
                }
            }
        });

        socket.ev.on("messages.upsert", async ({ messages, type }) => {
            const chat = messages[0];
            const pesan = (chat.message?.extendedTextMessage?.text ?? chat.message?.ephemeralMessage?.extendedTextMessage?.text ?? chat.message?.conversation)?.toLowerCase() ?? "";
            console.log(messages);

            if (pesan === '.ping') {
                kirimPesan(chat.key.remoteJid, "hallo");
            }
        });

    } catch (error) {
        console.error('Error initializing WhatsApp:', error);
        // Tambahkan jeda waktu sebelum mencoba menginisialisasi ulang pada error
        setTimeout(initializeWhatsApp, 5000);
    }
}

initializeWhatsApp();

module.exports = {
    initializeWhatsApp,
    eventEmitter,
    socket,
    formatPhoneNumber,
    kirimPesan
};
