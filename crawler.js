// crawler.js
const axios = require('axios');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const baseUrl = 'https://example.com';

async function crawl(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $('title').text();
    const content = $('body').text();

    await client.connect();
    const db = client.db('searchdb');
    const collection = db.collection('pages');

    await collection.updateOne(
      { url },
      { $set: { title, content, url, crawledAt: new Date() } },
      { upsert: true }
    );

    console.log(`Crawled: ${url}`);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.close();
  }
}

// Example: crawl 1 page (expand with more URLs or auto-crawl)
crawl(baseUrl);
