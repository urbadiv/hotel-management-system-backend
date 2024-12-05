const Event = require('../models/Event');

// Get Events for Public and Admin Views
exports.getEvents = async (req, res) => {
    try {
        const { role } = req.user || {};
        const currentDate = new Date();

        const events = role === 'admin'
            ? await Event.find() // Admin gets all events
            : await Event.find({ date: { $gte: currentDate } }); // Users get future events

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Create a New Event
exports.createEvent = async (req, res) => {
    try {
        const { name, date } = req.body;
        const banner = req.file ? req.file.path : null; // Get uploaded file path

        if (!banner) {
            return res.status(400).json({ message: 'Banner image is required' });
        }

        const event = new Event({
            name,
            date,
            banner,
            createdBy: req.user.id,
        });

        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

// Update an Event
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date } = req.body;
        const banner = req.file ? req.file.path : undefined;

        const updatedData = { name, date };
        if (banner) updatedData.banner = banner;

        const event = await Event.findByIdAndUpdate(id, updatedData, { new: true });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
};

// Delete an Event
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};
