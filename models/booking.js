const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    noOfAccommodations: {
        type: Number,
        required: true,
        min: [1, 'At least one accommodation is required'],
    },
    totalCost: {
        type: Number,
        required: true,
        min: [0, 'Total cost must be a positive number'],
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
