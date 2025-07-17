const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required
  price: { type: Number, required: true }, // Required
  imageUrl: { type: String, required: true }, // Required
  // Optional fields:
  description: { type: String, required: false },
  category: { type: String, required: true },
  tags: { type: [String], required: false },
  available: { type: Boolean}
}, { timestamps: true });

module.exports = mongoose.model('MenuItems', menuItemSchema);
