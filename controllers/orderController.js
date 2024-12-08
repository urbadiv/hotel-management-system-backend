const Order = require('../models/order');
const MenuItem = require('../models/menuItem');
const Room = require('../models/room');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { roomID, menuItemID, quantity, menuItemName, totalCost } = req.body;

        // // Validate Room existence
        // const room = await Room.findById(roomID);
        // if (!room) {
        //     return res.status(404).json({ error: 'Room not found' });
        // }

        // Validate MenuItem existence
        const menuItem = await MenuItem.findById(menuItemID);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Calculate total cost
        // const totalCost = menuItem.price * quantity;

        // Create order
        const newOrder = new Order({
            userID: req.user.id,
            roomID,
            menuItemID,
            menuItemName,
            totalCost,
            quantity,
        });
        console.log(req.user.id)
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all orders for the logged-in user
const getOrdersByUser = async (req, res) => {
    try {
        
        const orders = await Order.find({ userID: req.user.id })
            // .populate('roomID', 'type')
            // .populate('menuItemID', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('roomID', 'type')
            .populate('menuItemID', 'name price');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if (order.userID.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id, userID: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found or access denied' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findOneAndDelete({ _id: id, userID: req.user.id });

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found or access denied' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByUser,
    getOrderById,
    updateOrder,
    deleteOrder,
};
