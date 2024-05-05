const express = require('express');
const router = express.Router();
const orderPktExpressController = require('../../controllers/Order/orderExpressControllers');

// Rute untuk menampilkan semua order express
router.get('/', orderPktExpressController.getAllOrderPktExpress);

// Rute untuk membuat order express baru
router.post('/tambah_order', orderPktExpressController.createOrderPktExpress);

// Rute untuk menampilkan detail order express berdasarkan ID
router.get('/:id', orderPktExpressController.getOrderPktExpressById);

// Rute untuk mengupdate order express berdasarkan ID
router.put('/edit/:id', orderPktExpressController.updateOrderPktExpressById);

// Rute untuk menghapus order express berdasarkan ID
router.delete('/delete/:id', orderPktExpressController.deleteOrderPktExpressById);

module.exports = router;