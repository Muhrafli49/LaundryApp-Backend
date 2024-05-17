const express = require('express');
const router = express.Router();
const seluruhPaketControllers = require('../../controllers/Paket/seluruhPaketControllers');

router.get('/total_paket', seluruhPaketControllers.getTotalPaket);

module.exports = router;

