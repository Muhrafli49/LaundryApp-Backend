const express = require('express');
const router = express.Router();
const totalPendapatanController = require('../../controllers/Order/totalPendapatanControllers');

// Endpoint untuk menghitung total pendapatan dari masing-masing jenis order paket
router.get('/total_pendapatan', totalPendapatanController.totalPendapatan);

// Endpoint untuk menghitung total pendapatan & penegluaran
router.get('/total_pendapatan_pengeluaran', totalPendapatanController.PemasukanPengeluaran);


module.exports = router;
