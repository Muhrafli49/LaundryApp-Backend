const Pelanggan = require('../models/Pelanggan');

// Controller untuk menampilkan semua pelanggan 
exports.getAllPelanggan = async (req, res) => {
    try {
        const pelanggan = await Pelanggan.find();
        res.status(200).json({
            success: true,
            message: 'Semua pelanggan berhasil ditemukan',
            data: pelanggan
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat pelanggan baru 
exports.createPelanggan = async (req, res) => {
    try {
        const pelanggan = new Pelanggan(req.body);
        await pelanggan.save();
        res.status(201).json({
            success: true,
            message: 'Pelanggan berhasil dibuat',
            data: pelanggan
        });
    } catch (error) {
        if (error.code === 11000) { // Error kode untuk duplicate key
            res.status(400).json({ 
                success: false, 
                message: 'Nomor telepon sudah digunakan. Harap gunakan nomor telepon yang lain.' 
            });
        } else {
            res.status(400).json({ success: false, message: error.message });
        }
    }
};

// Controller untuk menampilkan pelanggan berdasarkan Id
exports.getPelangganById = async (req, res) => {
    try {
        const pelanggan = await Pelanggan.findById(req.params.id);
        if (!pelanggan) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pelanggan tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pelanggan berhasil ditemukan',
            data: pelanggan
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk mengupdate pelanggan berdasarkan Id
exports.updatePelangganById = async (req, res) => {
    try {
        const pelanggan = await Pelanggan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pelanggan) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pelanggan tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pelanggan berhasil diperbarui',
            data: pelanggan
        });
    } catch (error) {
        if (error.code === 11000) { // Error kode untuk duplicate key
            res.status(400).json({ 
                success: false, 
                message: 'Nomor telepon sudah digunakan. Harap gunakan nomor telepon yang lain.' 
            });
        } else {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

// Controller untuk menghapus pelanggan berdasarkan Id
exports.deletePelangganById = async (req, res) => {
    try {
        const deletedPelanggan = await Pelanggan.findByIdAndDelete(req.params.id);
        if (!deletedPelanggan) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pelanggan tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pelanggan berhasil dihapus',
            data: deletedPelanggan
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


