const OrderExpress = require('../../models/Order/OrderPktExpress');
const OrderReguler = require('../../models/Order/OrderPktReguler');
const OrderSetrika = require('../../models/Order/OrderPktSetrika');
const client = require('../../controllers/notificationsControllers');

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

const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('0')) {
        return `62${phoneNumber.slice(1)}`;
    }
    return phoneNumber;
};

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

        if (order.status) {
            const phoneNumber = formatPhoneNumber(order.nomorTeleponExp || order.nomorTeleponReg || order.nomorTeleponStr);
            const customerName = order.namaPelangganExp || order.namaPelangganReg || order.namaPelangganStr;
            const orderNumber = order.noOrderExp || order.noOrderReg || order.noOrderStr;

            const message = `Halo ${customerName}, order Anda dengan nomor ${orderNumber} sudah selesai. Terima kasih! ~Bingo Laundry`;

            // Menggunakan async/await untuk mengirim pesan
            const response = await client.sendMessage(`${phoneNumber}@c.us`, message);
            console.log('Message sent successfully:', response);
            res.status(200).send('Notification sent successfully.');
        } else {
            res.status(400).send('Order status is not complete.');
        }
    } catch (error) {
        console.error('Error fetching or sending order notification:', error);
        res.status(500).send('Failed to send notification.');
    }
};
