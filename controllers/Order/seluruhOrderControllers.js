const OrderExpress = require('../../models/Order/OrderPktExpress');
const OrderReguler = require('../../models/Order/OrderPktReguler');
const OrderSetrika = require('../../models/Order/OrderPktSetrika');

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
