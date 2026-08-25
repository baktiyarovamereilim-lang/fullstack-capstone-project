const express = require('express');
const natural = require('natural');
const router = express.Router();

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

router.post('/', (req, res) => {
    const { comment } = req.body;
    if (!comment) {
        return res.status(400).json({ error: "Comment is required" });
    }

    const alphaOnly = comment.toLowerCase().replace(/[^a-zA-Z\s]/g, "");
    const words = alphaOnly.split(/\s+/);
    const score = analyzer.getSentiment(words);

    let sentiment = "neutral";
    if (score < 0) sentiment = "negative";
    if (score > 0) sentiment = "positive";

    res.json({ score, sentiment });
});

module.exports = router;
