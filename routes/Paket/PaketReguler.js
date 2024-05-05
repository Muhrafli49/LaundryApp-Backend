const express = require('express');
const router = express.Router();
const pktRegulerController = require('../../controllers/Paket/paketRegulerControllers');

// Rute untuk menampilkan semua paket reguler
router.get('/', pktRegulerController.getAllPktReguler);

// Rute untuk membuat paket reguler baru
router.post('/tambah', pktRegulerController.createPktReguler);

// Rute untuk menampilkan detail paket reguler berdasarkan ID
router.get('/:id', pktRegulerController.getPktRegulerById);

// Rute untuk mengupdate paket reguler berdasarkan ID
router.put('/edit/:id', pktRegulerController.updatePktRegulerById);

// Rute untuk menghapus paket reguler berdasarkan ID
router.delete('/delete/:id', pktRegulerController.deletePktRegulerById);

module.exports = router;