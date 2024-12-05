const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');
const {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getMenuItemsByType, // Import the new method
} = require('../controllers/menuItemController');
const upload = require('../middleware/upload'); // Middleware for handling file uploads

const router = express.Router();

// Public route: Get all menu items
router.get('/menu-items', getAllMenuItems);

// Public route: Get menu items by type (Breakfast, Lunch, Dinner)
router.get('/menu-items/type/:type', getMenuItemsByType);  // Add this route

// Protected routes: Admin actions
router.use(verifyToken);

router.post('/menu-items', authorizeRole('admin'), upload.single('photo'), createMenuItem);
router.get('/menu-items/:id', getMenuItemById);
router.put('/menu-items/:id', authorizeRole('admin'), upload.single('photo'), updateMenuItem);
router.delete('/menu-items/:id', authorizeRole('admin'), deleteMenuItem);

module.exports = router;
