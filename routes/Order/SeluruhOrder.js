const express = require('express');
const router = express.Router();
const seluruhOrderControllers = require('../../controllers/Order/seluruhOrderControllers');

router.get('/:type/:id', seluruhOrderControllers.getOrderById);

module.exports = router;