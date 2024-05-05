const OrderPktSetrika = require('../../models/Order/OrderPktSetrika');

// Controller untuk menampilkan semua order setrika
exports.getAllOrderPktSetrika = async (req, res) => {
    try {
        const orderPktSetrika = await OrderPktSetrika.find();
        res.status(200).json({
            success: true,
            message: 'Semua order setrika berhasil ditemukan',
            data: orderPktSetrika
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat order setrika baru
exports.createOrderPktSetrika = async (req, res) => {
    try {
        // Buat order paket setrika dengan data yang diterima dari permintaan (req.body)
        const savedOrderPktSetrika = await OrderPktSetrika.create(req.body);

        // Ambil kembali data baru yang disimpan
        const latestOrder = await OrderPktSetrika.findOne({}).sort({ createdAt: -1 });

        // Simpan sementara noOrderStr dari order terbaru
        const noOrderStr = latestOrder.noOrderStr;

        // Hapus noOrderStr dari objek agar tidak ditampilkan dalam respons
        delete latestOrder.noOrderStr;

        // Sisipkan kembali noOrderStr ke posisi kedua setelah _id
        const updatedLatestOrder = {
            _id: latestOrder._id,
            noOrderStr: noOrderStr,
            ...latestOrder.toObject()
        };

        // Kirim respons ke client
        res.status(201).json({
            success: true,
            message: 'Order paket setrika berhasil dibuat',
            data: updatedLatestOrder
        });
    } catch (error) {
        // Tangani error jika terjadi
        res.status(400).json({ success: false, message: error.message });
    }
};


// Controller untuk menampilkan order paket setrika berdasarkan ID
exports.getOrderPktSetrikaById = async (req, res) => {
    try {
        const orderPktSetrika = await OrderPktSetrika.findById(req.params.id);
        if (!orderPktSetrika) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket setrika tidak ditemukan' 
            });
        }

        // Simpan sementara noOrderStr
        const noOrderStr = orderPktSetrika.noOrderStr;

        // Hapus noOrderStr dari objek
        delete orderPktSetrika.noOrderStr;

        // Sisipkan kembali noOrderStr ke posisi kedua setelah _id
        const updatedOrder = {
            _id: orderPktSetrika._id,
            noOrderStr: noOrderStr,
            ...orderPktSetrika.toObject()
        };

        res.status(200).json({
            success: true,
            message: 'Order paket setrika berhasil ditemukan',
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk mengupdate order paket setrika berdasarkan ID
exports.updateOrderPktSetrikaById = async (req, res) => {
    try {
        const orderPktSetrika = await OrderPktSetrika.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!orderPktSetrika) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket setrika tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order paket setrika berhasil diperbarui',
            data: orderPktSetrika
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk menghapus order paket setrika berdasarkan ID
exports.deleteOrderPktSetrikaById = async (req, res) => {
    try {
        const deletedOrderPktSetrika = await OrderPktSetrika.findByIdAndDelete(req.params.id);
        if (!deletedOrderPktSetrika) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket setrika tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order paket setrika berhasil dihapus',
            data: deletedOrderPktSetrika
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
