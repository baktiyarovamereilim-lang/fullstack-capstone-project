const express = require('express');
const cors = require('cors');
const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Подключение роутов
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
