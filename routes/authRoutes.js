// routes/authRoutes.js
const express = require('express');
const { signup, login, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {getUserProfile, updateUserProfile} = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
