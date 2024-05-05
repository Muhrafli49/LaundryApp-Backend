const express = require('express');
const router = express.Router();
const orderPktSetrikaController = require('../../controllers/Order/orderSetrikaControllers');

// Rute untuk menampilkan semua order setrika
router.get('/', orderPktSetrikaController.getAllOrderPktSetrika);

// Rute untuk membuat order setrika baru
router.post('/tambah_order', orderPktSetrikaController.createOrderPktSetrika);

// Rute untuk menampilkan detail order setrika berdasarkan ID
router.get('/:id', orderPktSetrikaController.getOrderPktSetrikaById);

// Rute untuk mengupdate order setrika berdasarkan ID
router.put('/edit/:id', orderPktSetrikaController.updateOrderPktSetrikaById);

// Rute untuk menghapus order setrika berdasarkan ID
router.delete('/delete/:id', orderPktSetrikaController.deleteOrderPktSetrikaById);

module.exports = router;