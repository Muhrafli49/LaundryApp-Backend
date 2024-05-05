const express = require('express');
const router = express.Router();
const pengajuanBarangController = require('../../controllers/Pengajuan/pengajuanBarangControllers');

// Rute untuk menampilkan semua pengajuan barang
router.get('/', pengajuanBarangController.getAllPengajuanBarang);

// Rute untuk membuat pengajuan barang baru
router.post('/tambah_pengajuan', pengajuanBarangController.createPengajuanBarang);

// Rute untuk menampilkan detail pengajuan barang berdasarkan ID
router.get('/:id', pengajuanBarangController.getPengajuanBarangById);

// Rute untuk mengupdate pengajuan barang berdasarkan ID
router.put('/edit/:id', pengajuanBarangController.updatePengajuanBarangById);

// Rute untuk menghapus pengajuan barang berdasarkan ID
router.delete('/delete/:id', pengajuanBarangController.deletePengajuanBarangById);

module.exports = router;