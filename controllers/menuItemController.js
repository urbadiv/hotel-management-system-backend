const MenuItem = require('../models/menuItem');

// Create a new menu item
const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, type } = req.body;
        const photo = req.file ? req.file.path : null;

        const newMenuItem = new MenuItem({ name, description, price, type, photo });
        const savedMenuItem = await newMenuItem.save();

        res.status(201).json(savedMenuItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all menu items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a menu item by ID
const getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a menu item by ID
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = req.file ? req.file.path : undefined;

        const updatedFields = { ...req.body };
        if (photo) updatedFields.photo = photo;

        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a menu item by ID
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
};
