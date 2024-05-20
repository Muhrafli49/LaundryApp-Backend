// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const wwebVersion = '2.2412.54';

// const OrderExpress = require('../models/Order/OrderPktExpress');
// const OrderReguler = require('../models/Order/OrderPktReguler');
// const OrderSetrika = require('../models/Order/OrderPktSetrika');

// const client = new Client({
//     authStrategy: new LocalAuth({}),
//     puppeteer: {},
//     webVersionCache: {
//         type: 'remote',
//         remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
//     },
// });

// client.on('message_create', message => {
//     console.log(message.body);
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('qr', qr => {
//     console.log('QR code received, please scan:');
//     qrcode.generate(qr, { small: true });
// });

// client.initialize();

// const markOrderAsComplete = async (req, res) => {
//     const { type, id } = req.params;

//     try {
//         let order;
//         switch (type) {
//             case 'exp':
//                 order = await OrderExpress.findById(id);
//                 break;
//             case 'reg':
//                 order = await OrderReguler.findById(id);
//                 break;
//             case 'str':
//                 order = await OrderSetrika.findById(id);
//                 break;
//             default:
//                 return res.status(400).json({ message: 'Invalid order type' });
//         }

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         order.status = true; // Mark as complete
//         await order.save();

//         const phoneNumber = order.noTelp; // Assuming the phone number is in this field
//         const message = `Halo ${order.namaPelanggan}, pesanan Anda dengan nomor order ${order.noOrder} telah selesai. Terima kasih telah bertransaksi dengan kami!`;

//         await client.sendMessage(phoneNumber + '@c.us', message);

//         res.status(200).json({ message: 'Order marked as complete and notification sent' });
//     } catch (error) {
//         console.error('Error marking order as complete:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// module.exports = { client, markOrderAsComplete };
