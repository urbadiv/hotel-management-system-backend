const Invoice = require('../models/invoice');
const Booking = require('../models/booking');
const Order = require('../models/order');

// Create a new invoice
const createInvoice = async (req, res) => {
    try {
        const { bookingID, orderID } = req.body;

        // Fetch the related booking
        const booking = await Booking.findById(bookingID);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Fetch the related order
        const order = await Order.findById(orderID);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Calculate the total cost (sum of booking and order costs)
        const bookingCost = booking.totalCost;
        const orderCost = order.totalCost;
        const totalCost = bookingCost + orderCost;

        // Create the invoice
        const newInvoice = new Invoice({
            userID: req.user.id,
            bookingID,
            orderID,
            bookingCost,
            orderCost,
            totalCost,
        });

        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all invoices for the logged-in user
const getInvoicesByUser = async (req, res) => {
    try {
        const invoices = await Invoice.find({ userID: req.user.id })
            .populate('bookingID', 'totalCost')
            .populate('orderID', 'totalCost');

        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific invoice by ID
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id)
            .populate('bookingID', 'totalCost')
            .populate('orderID', 'totalCost');

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        if (invoice.userID.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an invoice
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInvoice = await Invoice.findOneAndUpdate(
            { _id: id, userID: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ error: 'Invoice not found or access denied' });
        }

        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await Invoice.findOneAndDelete({ _id: id, userID: req.user.id });

        if (!deletedInvoice) {
            return res.status(404).json({ error: 'Invoice not found or access denied' });
        }

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createInvoice,
    getInvoicesByUser,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
