const PktReguler = require('../../models/Paket/PktReguler');

// Controller untuk menampilkan semua paket reguler
exports.getAllPktReguler = async (req, res) => {
    try {
        const pktReguler = await PktReguler.find();
        res.status(200).json({
            success: true,
            message: 'Semua paket reguler berhasil ditemukan',
            data: pktReguler
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat paket reguler baru
exports.createPktReguler = async (req, res) => {
    try {
        const savedPktReguler = await PktReguler.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Paket reguler berhasil dibuat',
            data: savedPktReguler
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller untuk menampilkan detail paket reguler berdasarkan ID
exports.getPktRegulerById = async (req, res) => {
    try {
        const pktReguler = await PktReguler.findById(req.params.id);
        if (!pktReguler) {
            return res.status(404).json({ 
                success: false, 
                message: 'Paket reguler tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Paket reguler berhasil ditemukan',
            data: pktReguler
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk mengupdate paket reguler berdasarkan ID
exports.updatePktRegulerById = async (req, res) => {
    try {
        const pktReguler = await PktReguler.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pktReguler) {
            return res.status(404).json({ 
                success: false, 
                message: 'Paket reguler tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Paket reguler berhasil diperbarui',
            data: pktReguler
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk menghapus paket reguler berdasarkan ID
exports.deletePktRegulerById = async (req, res) => {
    try {
        const pktReguler = await PktReguler.findByIdAndDelete(req.params.id);
        if (!pktReguler) {
            return res.status(404).json({ 
                success: false, 
                message: 'Paket reguler tidak ditemukan' 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: 'Paket reguler berhasil dihapus',
            data: pktReguler
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}