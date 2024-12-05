const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createInvoice,
    getInvoicesByUser,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/invoiceController');

const router = express.Router();

// Middleware: User must be authenticated
router.use(verifyToken);

// Create a new invoice
router.post('/invoices', createInvoice);

// Get all invoices for the logged-in user
router.get('/invoices', getInvoicesByUser);

// Get a specific invoice by ID
router.get('/invoices/:id', getInvoiceById);

// Update an invoice
router.put('/invoices/:id', updateInvoice);

// Delete an invoice
router.delete('/invoices/:id', deleteInvoice);

module.exports = router;
