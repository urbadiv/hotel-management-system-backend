const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createBooking,
    getBookingsByUser,
    getBookingById,
    updateBooking,
    deleteBooking,
} = require('../controllers/bookingController');

const router = express.Router();

// Middleware: User must be authenticated
router.use(verifyToken);

// Create a new booking
router.post('/bookings', createBooking);

// Get all bookings for the logged-in user
router.get('/bookings', getBookingsByUser);

// Get a specific booking by ID
router.get('/bookings/:id', getBookingById);

// Update a booking
router.put('/bookings/:id', updateBooking);

// Delete a booking
router.delete('/bookings/:id', deleteBooking);

module.exports = router;
