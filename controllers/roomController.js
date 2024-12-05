const Room = require('../models/room');

// Create a new room
const createRoom = async (req, res) => {
    try {
        const { type, status, rate } = req.body;
        const photo = req.file ? req.file.path : null; // Assuming photo is uploaded as a file
        const newRoom = new Room({ type, status, rate, photo });
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a room by ID
const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a room by ID
const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // If a new photo is uploaded, update the photo field
        if (req.file) {
            updates.photo = req.file.path;
        }

        const updatedRoom = await Room.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a room by ID
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
};
