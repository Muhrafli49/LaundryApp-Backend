const OrderExpress = require('../../models/Order/OrderPktExpress');
const OrderReguler = require('../../models/Order/OrderPktReguler');
const OrderSetrika = require('../../models/Order/OrderPktSetrika');
const { eventEmitter, socket, formatPhoneNumber, kirimPesan } = require('../notificationsControllers');

exports.getOrderById = async (req, res) => {
    const { id, type } = req.params;

    try {
        let order;
        switch (type) {
            case 'exp':
                order = await OrderExpress.findById(id);
                break;
            case 'reg':
                order = await OrderReguler.findById(id);
                break;
            case 'str':
                order = await OrderSetrika.findById(id);
                break;
            default:
                return res.status(400).json({ message: 'Invalid order type' });
        }

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getTotalOrder = async (req, res) => {
    try {
        const expressCount = await OrderExpress.countDocuments();
        const regulerCount = await OrderReguler.countDocuments();
        const setrikaCount = await OrderSetrika.countDocuments();

        res.json({
            success: true,
            message: 'Total Orderan setiap paket',
            totalExp: expressCount,
            totalReg: regulerCount,
            totalStr: setrikaCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching total paket',
            error: error.message
        });
    }
};

eventEmitter.on('connectionStatus', (status) => {
    if (status === 'ready') {
        console.log('WhatsApp siap untuk mengirim notifikasi.');
    } else if (status === 'disconnected') {
        console.log('Koneksi WhatsApp terputus.');
    }
});

exports.sendNotification = async (req, res) => {
    const { orderType, orderId } = req.params;

    try {
        let order;
        switch (orderType) {
            case 'exp':
                order = await OrderExpress.findById(orderId.trim());
                break;
            case 'reg':
                order = await OrderReguler.findById(orderId.trim());
                break;
            case 'str':
                order = await OrderSetrika.findById(orderId.trim());
                break;
            default:
                return res.status(400).json({ message: 'Invalid order type' });
        }

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const phoneNumber = formatPhoneNumber(order.nomorTeleponExp || order.nomorTeleponReg || order.nomorTeleponStr);
        const customerName = order.namaPelangganExp || order.namaPelangganReg || order.namaPelangganStr;
        const orderNumber = order.noOrderExp || order.noOrderReg || order.noOrderStr;
        const sisaTagihan = order.totalBayarExp || order.totalBayarReg || order.totalBayarStr;

        let message;
        if (order.status) {
            message = `Halo ${customerName}, order Anda dengan nomor ${orderNumber} sudah selesai, dan siap diambil.\nStatus: Lunas\nSisa Tagihan: Rp. 0, -\n---------------------------\n~Bingo Laundry\nTerimakasih atas kunjungan anda ☺`;
        } else {
            message = `Halo ${customerName}, order Anda dengan nomor ${orderNumber} sudah selesai, dan siap diambil.\nStatus: Belum lunas\nSisa tagihan: Rp. ${sisaTagihan.toLocaleString('id-ID')},-.\n---------------------------\n~Bingo Laundry\nTerimakasih atas kunjungan anda ☺`;
        }

        // try {
        await kirimPesan(`${phoneNumber}@s.whatsapp.net`, message);
        res.status(200).send('Notification sent successfully.');
        // } catch (err) {
        //     console.error('Failed to send message:', err);
        //     res.status(500).send('Failed to send notification.');
        // }
    } catch (error) {
        console.error('Error fetching order or session:', error);
        res.status(500).send('Error fetching order or session.');
    }
};

