const Booking = require('../models/booking');
const Room = require('../models/room');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { checkIn, checkOut, roomID, noOfAccommodations, totalCost } = req.body;

        // Validate room existence
        const room = await Room.findById(roomID);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        const newBooking = new Booking({
            userID: req.user.id,
            checkIn,
            checkOut,
            roomID,
            noOfAccommodations,
            totalCost,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings for the logged-in user
const getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ userID: req.user.id }).populate('roomID', 'type rate');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id).populate('roomID', 'type rate');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        if (booking.userID.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a booking
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBooking = await Booking.findOneAndUpdate(
            { _id: id, userID: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found or access denied' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a booking
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findOneAndDelete({ _id: id, userID: req.user.id });

        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found or access denied' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingsByUser,
    getBookingById,
    updateBooking,
    deleteBooking,
};
