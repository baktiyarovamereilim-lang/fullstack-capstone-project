const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');
const { ObjectId } = require('mongodb');

// GET /api/gifts — получить все подарки
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        res.status(500).json({ error: "Error fetching gifts: " + e.message });
    }
});

// GET /api/gifts/:id — получить подарок по ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;

        let query = { _id: id };
        if (ObjectId.isValid(id)) {
            query = { $or: [{ _id: id }, { _id: new ObjectId(id) }] };
        }

        const gift = await collection.findOne(query);
        if (!gift) {
            return res.status(404).json({ error: "Gift not found" });
        }
        res.json(gift);
    } catch (e) {
        res.status(500).json({ error: "Error fetching gift: " + e.message });
    }
});

module.exports = router;
