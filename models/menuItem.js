const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    required: true,
  },
  photo: {
    type: String, // Path to the uploaded photo
  },
}, {
  timestamps: true,
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
