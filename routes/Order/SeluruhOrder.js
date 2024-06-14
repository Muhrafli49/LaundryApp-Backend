const express = require('express');
const router = express.Router();
const seluruhOrderControllers = require('../../controllers/Order/seluruhOrderControllers');

router.get('/:type/:id', seluruhOrderControllers.getOrderById);

router.get('/total_order', seluruhOrderControllers.getTotalOrder);

router.get('/sendNotification/:orderType/:orderId', async (req, res) => {
    try {
        console.log('Received request to sendNotification:', req.params);

        await seluruhOrderControllers.sendNotification(req, res);
    } catch (error) {
        console.error('Error in sendNotification endpoint:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
