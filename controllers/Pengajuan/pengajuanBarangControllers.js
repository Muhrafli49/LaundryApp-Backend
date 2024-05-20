const PengajuanBarang = require('../../models/Pengajuan/PengajuanBarang');

// Controller untuk menampilkan semua pengajuan barang
exports.getAllPengajuanBarang = async (req, res) => {
    try {
        const pengajuanBarang = await PengajuanBarang.find();

        // Jika tidak ada pengajuan barang yang ditemukan, kirim respons kosong
        if (!pengajuanBarang.length) {
            return res.status(200).json({
                success: true,
                message: 'Tidak ada pengajuan barang yang ditemukan',
                data: []
            });
        }

        // Iterasi melalui setiap pengajuan barang dan menyesuaikan urutan properti
        const formattedPengajuan = pengajuanBarang.map(pengajuan => {
            const { _id, noPengajuan, ...rest } = pengajuan.toObject();
            return {
                _id,
                noPengajuan,
                ...rest
            };
        });

        res.status(200).json({
            success: true,
            message: 'Semua pengajuan barang berhasil ditemukan',
            data: formattedPengajuan
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk membuat pengajuan barang baru
exports.createPengajuanBarang = async (req, res) => {
    try {
        // Buat pengajuan barang dengan data yang diterima dari permintaan (req.body)
        const savedPengajuanBarang = await PengajuanBarang.create(req.body);

        // Ambil kembali data baru yang disimpan
        const latestPengajuan = await PengajuanBarang.findOne({}).sort({ createdAt: -1 });

        // Simpan sementara noPengajuan dari pengajuan terbaru
        const noPengajuan = latestPengajuan.noPengajuan;

        // Hapus noPengajuan dari objek agar tidak ditampilkan dalam respons
        delete latestPengajuan.noPengajuan;

        // Sisipkan kembali noPengajuan ke posisi kedua setelah _id
        const updatedLatestPengajuan = {
            _id: latestPengajuan._id,
            noPengajuan,
            ...latestPengajuan.toObject()
        };

        // Kirim respons ke client
        res.status(201).json({
            success: true,
            message: 'Pengajuan barang berhasil dibuat',
            data: updatedLatestPengajuan
        });
    } catch (error) {
        // Tangani error jika terjadi
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller untuk menampilkan pengajuan barang berdasarkan ID
exports.getPengajuanBarangById = async (req, res) => {
    try {
        const pengajuanBarang = await PengajuanBarang.findById(req.params.id);
        if (!pengajuanBarang) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pengajuan barang tidak ditemukan' 
            });
        }

        // Simpan sementara noPengajuan
        const noPengajuan = pengajuanBarang.noPengajuan;

        // Hapus noPengajuan dari objek
        delete pengajuanBarang.noPengajuan;

        // Sisipkan kembali noPengajuan ke posisi kedua setelah _id
        const updatedPengajuan = {
            _id: pengajuanBarang._id,
            noPengajuan,
            ...pengajuanBarang.toObject()
        };

        res.status(200).json({
            success: true,
            message: 'Pengajuan barang berhasil ditemukan',
            data: updatedPengajuan
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk mengupdate pengajuan barang berdasarkan ID
exports.updatePengajuanBarangById = async (req, res) => {
    try {
        const pengajuanBarang = await PengajuanBarang.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pengajuanBarang) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pengajuan barang tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pengajuan barang berhasil diperbarui',
            data: pengajuanBarang
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller untuk menghapus pengajuan barang berdasarkan ID
exports.deletePengajuanBarangById = async (req, res) => {
    try {
        const deletedPengajuanBarang = await PengajuanBarang.findByIdAndDelete(req.params.id);
        if (!deletedPengajuanBarang) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pengajuan barang tidak ditemukan' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pengajuan barang berhasil dihapus',
            data: deletedPengajuanBarang
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Controller untuk menjumlahkan semua pengajuan barang 
exports.countPengajuanBarang = async (req, res) => {
    try {
        const count = await PengajuanBarang.countDocuments({ status: false });

        res.status(200).json({
            success: true,
            message: 'Jumlah pengajuan barang berhasil dihitung',
            count: count
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

