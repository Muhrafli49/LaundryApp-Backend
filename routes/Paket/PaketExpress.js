const express = require('express');
const router = express.Router();
const pktExpressController = require('../../controllers/Paket/paketExpressControllers');

// Rute untuk menampilkan semua paket express
router.get('/', pktExpressController.getAllPktExpress);

// Rute untuk membuat paket express baru
router.post('/tambah', pktExpressController.createPktExpress);

// Rute untuk menampilkan detail paket express berdasarkan ID
router.get('/:id', pktExpressController.getPktExpressById);

// Rute untuk mengupdate paket express berdasarkan ID
router.put('edit/:id', pktExpressController.updatePktExpressById);

// Rute untuk menghapus paket express berdasarkan ID
router.delete('/delete/:id', pktExpressController.deletePktExpressById);

module.exports = router;
