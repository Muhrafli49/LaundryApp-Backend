const OrderPktReguler = require('../../models/Order/OrderPktReguler');

// Controller untuk menampilkan semua order reguler
exports.getAllOrderPktReguler = async (req, res) => {
    try {
        const orderPktReguler = await OrderPktReguler.find();

        // Jika tidak ada pesanan yang ditemukan, kirim respons kosong
        if (!orderPktReguler.length) {
            return res.status(200).json({
                success: true,
                message: 'Tidak ada order reguler yang ditemukan',
                data: []
            });
        }

        // Iterasi melalui setiap pesanan dan menyesuaikan urutan properti
        const formattedOrders = orderPktReguler.map(order => {
            const { _id, noOrderReg, ...rest } = order.toObject();
            return {
                _id,
                noOrderReg,
                ...rest
            };
        });

        res.status(200).json({
            success: true,
            message: 'Semua order reguler berhasil ditemukan',
            data: formattedOrders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat order reguler baru
exports.createOrderPktReguler = async (req, res) => {
    try {
        // Buat order paket reguler dengan data yang diterima dari permintaan (req.body)
        await OrderPktReguler.create(req.body);

        // Ambil kembali data baru yang disimpan
        const latestOrder = await OrderPktReguler.findOne({}).sort({ createdAt: -1 });

        // Simpan sementara noOrderReg dari order terbaru
        const noOrderReg = latestOrder.noOrderReg;

        // Hapus noOrderReg dari objek agar tidak ditampilkan dalam respons
        delete latestOrder.noOrderReg;

        // Sisipkan kembali noOrderReg ke posisi kedua setelah _id
        const updatedLatestOrder = {
            _id: latestOrder._id,
            noOrderReg: noOrderReg,
            ...latestOrder.toObject()
        };

        // Kirim respons ke client
        res.status(201).json({
            success: true,
            message: 'Order paket reguler berhasil dibuat',
            data: updatedLatestOrder
        });
    } catch (error) {
        // Tangani error jika terjadi
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller untuk menampilkan order paket reguler berdasarkan ID
exports.getOrderPktRegulerById = async (req, res) => {
    try {
        const orderPktReguler = await OrderPktReguler.findById(req.params.id);
        if (!orderPktReguler) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket reguler tidak ditemukan' 
            });
        }

        // Simpan sementara noOrderReg
        const noOrderReg = orderPktReguler.noOrderReg;

        // Hapus noOrderReg dari objek
        delete orderPktReguler.noOrderReg;

        // Sisipkan kembali noOrderReg ke posisi kedua setelah _id
        const updatedOrder = {
            _id: orderPktReguler._id,
            noOrderReg: noOrderReg,
            ...orderPktReguler.toObject()
        };

        res.status(200).json({
            success: true,
            message: 'Order paket reguler berhasil ditemukan',
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk mengupdate order paket reguler berdasarkan ID
exports.updateOrderPktRegulerById = async (req, res) => {
    try {
        const orderPktReguler = await OrderPktReguler.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!orderPktReguler) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket reguler tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order paket reguler berhasil diperbarui',
            data: orderPktReguler
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller untuk menghapus order paket reguler berdasarkan ID
exports.deleteOrderPktRegulerById = async (req, res) => {
    try {
        const deletedOrderPktReguler = await OrderPktReguler.findByIdAndDelete(req.params.id);
        if (!deletedOrderPktReguler) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order paket reguler tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order paket reguler berhasil dihapus',
            data: deletedOrderPktReguler
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
