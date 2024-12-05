const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createOrder,
    getOrdersByUser,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

// Middleware: User must be authenticated
router.use(verifyToken);

// Create a new order
router.post('/orders', createOrder);

// Get all orders for the logged-in user
router.get('/orders', getOrdersByUser);

// Get a specific order by ID
router.get('/orders/:id', getOrderById);

// Update an order
router.put('/orders/:id', updateOrder);

// Delete an order
router.delete('/orders/:id', deleteOrder);

module.exports = router;
