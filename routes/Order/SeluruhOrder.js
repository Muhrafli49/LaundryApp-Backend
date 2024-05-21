const express = require('express');
const router = express.Router();
const seluruhOrderControllers = require('../../controllers/Order/seluruhOrderControllers');

router.get('/:type/:id', seluruhOrderControllers.getOrderById);

router.get('/total_order', seluruhOrderControllers.getTotalOrder);

router.get('/sendNotification/:orderType/:orderId', seluruhOrderControllers.sendNotification);

module.exports = router;