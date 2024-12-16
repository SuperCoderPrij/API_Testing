const mongoose = require('mongoose');

// Define a schema and model
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema);
