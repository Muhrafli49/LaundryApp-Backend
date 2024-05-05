const express = require('express');
const router = express.Router();
const orderPktRegulerController = require('../../controllers/Order/orderRegulerControllers');

// Rute untuk menampilkan semua order reguler
router.get('/', orderPktRegulerController.getAllOrderPktReguler);

// Rute untuk membuat order reguler baru
router.post('/tambah_order', orderPktRegulerController.createOrderPktReguler);

// Rute untuk menampilkan detail order reguler berdasarkan ID
router.get('/:id', orderPktRegulerController.getOrderPktRegulerById);

// Rute untuk mengupdate order reguler berdasarkan ID
router.put('/edit/:id', orderPktRegulerController.updateOrderPktRegulerById);

// Rute untuk menghapus order reguler berdasarkan ID
router.delete('/delete/:id', orderPktRegulerController.deleteOrderPktRegulerById);

module.exports = router;