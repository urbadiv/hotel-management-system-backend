const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Family', 'Premium', 'Deluxe', 'Twin'],
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  rate: {
    type: Number,
    required: true,
    min: [0, 'Rate must be a positive number'],
  },
  photo: {
    type: String, // URL to the photo
    required: false, // Optional, set to `true` if photo is mandatory
  },
  description: {
    type: String, // A short description of the room
    required: false, // Optional description
  },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
