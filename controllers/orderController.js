const router = require('express').Router();
const orderModel = require('../models/orders/orderModel');

router.get('/', orderModel.getOrders);
router.get('/:id', orderModel.getOrder);

router.post('/new', orderModel.createOrder);

router.patch('/:id', orderModel.updateOrder);

router.delete('/:id', orderModel.deleteOrder);

module.exports = router;