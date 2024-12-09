// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'event-manager', 'inventory-manager', 'booking-manager', 'hr-manager' ], required: true },
    employeeId: { type: String },
    nic: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate reset password token
const { randomBytes } = require('crypto');

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = randomBytes(20).toString('hex');
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    return resetToken;
};


module.exports = mongoose.model('User', userSchema);
