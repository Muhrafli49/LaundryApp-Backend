const PaketExpress = require('../../models/Paket/PktExpress');
const PaketReguler = require('../../models/Paket/PktReguler');
const PaketSetrika = require('../../models/Paket/PktSetrika');

// Menghitung seluruh jumlah paket yang tersedia
exports.getTotalPaket = async (req, res) => {
    try {
        const expressCount = await PaketExpress.countDocuments();
        const regulerCount = await PaketReguler.countDocuments();
        const setrikaCount = await PaketSetrika.countDocuments();

        const totalPaket = expressCount + regulerCount + setrikaCount;

        res.json({
            success: true,
            message: 'Total paket berhasil dihitung',
            data: totalPaket
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching total paket',
            error: error.message
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
