// Import required modules
const express = require('express');
const connectDB = require('./config/db');
const Item = require('./models/Item');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
// 1. GET - Fetch all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// 2. POST - Create a new item
app.post('/api/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// 3. PUT - Update an item by ID
app.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// 4. DELETE - Delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
