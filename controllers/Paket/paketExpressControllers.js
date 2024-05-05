const PktExpress = require('../../models/Paket/PktExpress');

// Controller untuk menampilkan semua paket express
exports.getAllPktExpress = async (req, res) => {
    try {
        const pktExpress = await PktExpress.find();
        res.status(200).json({
            success: true,
            message: 'Semua paket express berhasil ditemukan',
            data: pktExpress
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat paket express baru
exports.createPktExpress = async (req, res) => {
    try {
        const savedPktExpress = await PktExpress.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Paket express berhasil dibuat',
            data: savedPktExpress
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller untuk menampilkan detail paket express berdasarkan ID
exports.getPktExpressById = async (req, res) => {
    try {
        const pktExpress = await PktExpress.findById(req.params.id);
        if (!pktExpress) {
            return res.status(404).json({ 
                success: false, 
                message: 'Paket express tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Paket express berhasil ditemukan',
            data: pktExpress
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk mengupdate paket express berdasarkan ID
exports.updatePktExpressById = async (req, res) => {
    try {
        const pktExpress = await PktExpress.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pktExpress) {
            return res.status(404).json({ 
                success: false, 
                message: 'Paket express tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Paket express berhasil diperbarui',
            data: pktExpress
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk menghapus paket express berdasarkan ID
exports.deletePktExpressById = async (req, res) => {
    try {
        const pktExpress = await PktExpress.findByIdAndDelete(req.params.id);
        if (!pktExpress) {
            return res.status(404).json({ 
                success: false, 
                message: 'Paket express tidak ditemukan' });
        }
        res.status(200).json({ 
            success: true, 
            message: 'Paket express berhasil dihapus',
            data: pktExpress
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
