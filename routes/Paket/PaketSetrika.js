const express = require('express');
const router = express.Router();
const pktSetrikaController = require('../../controllers/Paket/paketSetrikaControllers');

// Rute untuk menampilkan semua paket setrika
router.get('/', pktSetrikaController.getAllPktSetrika);

// Rute untuk membuat paket setrika baru
router.post('/tambah', pktSetrikaController.createPktSetrika);

// Rute untuk menampilkan detail paket setrika berdasarkan ID
router.get('/:id', pktSetrikaController.getPktSetrikaById);

// Rute untuk mengupdate paket setrika berdasarkan ID
router.put('/edit/:id', pktSetrikaController.updatePktSetrikaById);

// Rute untuk menghapus paket setrika berdasarkan ID
router.delete('/delete/:id', pktSetrikaController.deletePktSetrikaById);

module.exports = router;

