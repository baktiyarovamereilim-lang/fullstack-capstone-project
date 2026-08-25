const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/giftsdb';
let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) return dbInstance;
    
    const client = new MongoClient(url);
    await client.connect();
    dbInstance = client.db();
    console.log("Connected successfully to MongoDB");
    return dbInstance;
}

module.exports = connectToDatabase;
