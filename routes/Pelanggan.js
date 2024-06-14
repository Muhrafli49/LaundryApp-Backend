const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganControllers');

// Rute untuk menampilkan semua pelanggan
router.get('/', pelangganController.getAllPelanggan);

// Rute untuk mendapatkan total pelanggan
router.get('/total_pelanggan', pelangganController.getTotalPelanggan)

// Rute untuk membuat pelanggan baru
router.post('/tambah_pelanggan', pelangganController.createPelanggan);

// Rute untuk menampilkan pelanggan berdasarkan Id
router.get('/:id', pelangganController.getPelangganById);

// Rute untuk mengupdate pelanggan berdasarkan Id
router.put('/edit/:id', pelangganController.updatePelangganById);

// Rute untuk menghapus pelanggan berdasarkan Id
router.delete('/delete/:id', pelangganController.deletePelangganById);


module.exports = router;