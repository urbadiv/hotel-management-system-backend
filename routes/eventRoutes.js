const express = require('express');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const upload = require('../middleware/upload');

const router = express.Router();

// Public route: Get future events
router.get('/events', getEvents);

// Protected routes: Admin actions
router.use(verifyToken);

router.post('/events', authorizeRole('admin'), upload.single('banner'), createEvent);
router.put('/events/:id', authorizeRole('admin'), upload.single('banner'), updateEvent);
router.delete('/events/:id', authorizeRole('admin'), deleteEvent);

module.exports = router;
