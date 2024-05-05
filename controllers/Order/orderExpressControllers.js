const OrderPktExpress = require('../../models/Order/OrderPktExpress');

// Controller untuk menampilkan semua order express
exports.getAllOrderPktExpress = async (req, res) => {
    try {
        const orderPktExpress = await OrderPktExpress.find();

        // Jika tidak ada pesanan yang ditemukan, kirim respons kosong
        if (!orderPktExpress.length) {
            return res.status(200).json({
                success: true,
                message: 'Tidak ada order express yang ditemukan',
                data: []
            });
        }

        // Iterasi melalui setiap pesanan dan menyesuaikan urutan properti
        const formattedOrders = orderPktExpress.map(order => {
            const { _id, noOrderExp, ...rest } = order.toObject();
            return {
                _id,
                noOrderExp,
                ...rest
            };
        });

        res.status(200).json({
            success: true,
            message: 'Semua order express berhasil ditemukan',
            data: formattedOrders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat order paket express baru
exports.createOrderPktExpress = async (req, res) => {
    try {
        await OrderPktExpress.create(req.body);

        // Ambil kembali data baru yang disimpan, diurutkan berdasarkan createdAt secara descending
        const latestOrder = await OrderPktExpress.findOne({}).sort({ createdAt: -1 });

        // Simpan sementara noOrderExp
        const noOrderExp = latestOrder.noOrderExp;

        // Hapus noOrderExp dari objek
        delete latestOrder.noOrderExp;

        // Sisipkan kembali noOrderExp ke posisi kedua setelah _id
        const updatedLatestOrder = {
            _id: latestOrder._id,
            noOrderExp: noOrderExp,
            ...latestOrder.toObject()
        };

        res.status(201).json({
            success: true,
            message: 'Order paket express berhasil dibuat',
            data: updatedLatestOrder
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Controller untuk menampilkan order paket express berdasarkan ID
// Controller untuk menampilkan order paket express berdasarkan ID
exports.getOrderPktExpressById = async (req, res) => {
    try {
        const orderPktExpress = await OrderPktExpress.findById(req.params.id);
        if (!orderPktExpress) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket express tidak ditemukan' 
            });
        }

        // Simpan sementara noOrderExp
        const noOrderExp = orderPktExpress.noOrderExp;

        // Hapus noOrderExp dari objek
        delete orderPktExpress.noOrderExp;

        // Sisipkan kembali noOrderExp ke posisi kedua setelah _id
        const updatedOrder = {
            _id: orderPktExpress._id,
            noOrderExp: noOrderExp,
            ...orderPktExpress.toObject()
        };

        res.status(200).json({
            success: true,
            message: 'Order paket express berhasil ditemukan',
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Controller untuk mengupdate order paket express berdasarkan ID
exports.updateOrderPktExpressById = async (req, res) => {
    try {
        const orderPktExpress = await OrderPktExpress.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!orderPktExpress) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket express tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order paket express berhasil diperbarui',
            data: orderPktExpress
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk menghapus order paket express berdasarkan ID
exports.deleteOrderPktExpressById = async (req, res) => {
    try {
        const orderPktExpress = await OrderPktExpress.findByIdAndDelete(req.params.id);
        if (!orderPktExpress) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket express tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order paket express berhasil dihapus',
            data: orderPktExpress
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
