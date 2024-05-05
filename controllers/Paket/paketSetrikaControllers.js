const PktSetrika = require('../../models/Paket/PktSetrika');

// Controller untuk menampilkan semua paket setrika
exports.getAllPktSetrika = async (req, res) => {
    try {
        const pktSetrika = await PktSetrika.find();
        res.status(200).json({
            success: true,
            message: 'Semua paket setrika berhasil ditemukan',
            data: pktSetrika
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat paket setrika baru
exports.createPktSetrika = async (req, res) => {
    try {
        const savedPktSetrika = await PktSetrika.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Paket setrika berhasil dibuat',
            data: savedPktSetrika
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller untuk menampilkan detail paket setrika berdasarkan ID
exports.getPktSetrikaById = async (req, res) => {
    try {
        const pktSetrika = await PktSetrika.findById(req.params.id);
        if (!pktSetrika) {
            return res.status(404).json({ success: false, message: 'Paket setrika tidak ditemukan' });
        }
        res.status(200).json({
            success: true,
            message: 'Paket setrika berhasil ditemukan',
            data: pktSetrika
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk mengupdate paket setrika berdasarkan ID
exports.updatePktSetrikaById = async (req, res) => {
    try {
        const pktSetrika = await PktSetrika.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pktSetrika) {
            return res.status(404).json({ success: false, message: 'Paket setrika tidak ditemukan' });
        }
        res.status(200).json({
            success: true,
            message: 'Paket setrika berhasil diperbarui',
            data: pktSetrika
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk menghapus paket setrika berdasarkan ID
exports.deletePktSetrikaById = async (req, res) => {
    try {
        const pktSetrika = await PktSetrika.findByIdAndDelete(req.params.id);
        if (!pktSetrika) {
            return res.status(404).json({ success: false, message: 'Paket setrika tidak ditemukan' });
        }
        res.status(200).json({
            success: true,
            message: 'Paket setrika berhasil dihapus',
            data: pktSetrika
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



