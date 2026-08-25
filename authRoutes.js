const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// POST /api/auth/login — вход пользователя
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");
        const { email, password } = req.body;

        // Поиск пользователя в MongoDB с помощью findOne
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user: { id: user._id, email: user.email, name: user.name } });
    } catch (e) {
        res.status(500).json({ error: "Authentication error: " + e.message });
    }
});

module.exports = router;
