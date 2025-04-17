// server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) return res.status(400).send('Query required');

  try {
    await client.connect();
    const db = client.db('searchdb');
    const collection = db.collection('pages');

    const results = await collection.find({
      $text: { $search: q }
    }).toArray();

    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log(`Search API running on port ${PORT}`));
