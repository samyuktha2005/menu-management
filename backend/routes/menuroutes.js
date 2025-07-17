const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItems');

// POST /api/menu → Add single or multiple menu items
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    if (Array.isArray(body)) {
      // Multiple items insertion
      const savedItems = await MenuItem.insertMany(body);
      res.json(savedItems);
    } else {
      // Single item insertion
      const newItem = new MenuItem(body);
      const savedItem = await newItem.save();
      res.json(savedItem);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/menu → Fetch all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/menu/:id → Update single menu item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/menu → Update multiple menu items
// Expects: [{ _id, fields to update }, ...]
router.put('/', async (req, res) => {
  try {
    const updates = req.body; // array of updates
    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: 'Expected an array of update objects.' });
    }

    const results = await Promise.all(
      updates.map(update =>
        MenuItem.findByIdAndUpdate(update._id, update, { new: true })
      )
    );
    res.json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/menu/:id → Delete single menu item
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/menu → Delete multiple menu items
// Expects: { ids: [id1, id2, ...] }
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: 'Expected "ids" to be an array.' });
    }
    await MenuItem.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Menu items deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
