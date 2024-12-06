const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Multer middleware for file uploads
const {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
    getRoomsByType, // Import the new method
} = require('../controllers/roomController');

const router = express.Router();

// Public: Get all rooms
router.get('/rooms', getAllRooms);

// Public: Get rooms by type (e.g., 'single', 'double', etc.)
router.get('/rooms/type/:type', getRoomsByType);  // Add this route

// Protected: Require authentication for the following routes
router.use(verifyToken);

// Get a room by ID
router.get('/rooms/:id', getRoomById);

// Admin-only: Create, Update, and Delete rooms
router.post('/rooms', authorizeRole('admin'), upload.single('photo'), createRoom);
router.put('/rooms/:id', authorizeRole('admin'), upload.single('photo'), updateRoom);
router.delete('/rooms/:id', authorizeRole('admin'), deleteRoom);

module.exports = router;
