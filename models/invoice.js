const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  bookingCost: {
    type: Number,
    required: true,
    min: [0, 'Booking cost must be a positive number'],
  },
  orderCost: {
    type: Number,
    required: true,
    min: [0, 'Order cost must be a positive number'],
  },
  totalCost: {
    type: Number,
    required: true,
    min: [0, 'Total cost must be a positive number'],
  },
}, {
  timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
