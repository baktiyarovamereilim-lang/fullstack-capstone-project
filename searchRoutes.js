const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// GET /api/search — поиск и фильтрация товаров по категории и имени
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        let query = {};

        // Фильтрация по категории (category)
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Поиск по названию товара (name), если передано
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }

        const results = await collection.find(query).toArray();
        res.json(results);
    } catch (e) {
        res.status(500).json({ error: "Search failed: " + e.message });
    }
});

module.exports = router;
