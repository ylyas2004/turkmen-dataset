require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Update this section with your Clever Cloud MySQL connection details
const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fetch all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new text entry
app.post('/api/text-entries', async (req, res) => {
  const { title, text, summary, language, category } = req.body;
  try {
    let [rows] = await pool.query('SELECT id FROM categories WHERE name = ?', [category]);
    let categoryId;

    if (rows.length === 0) {
      const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [category]);
      categoryId = result.insertId;
    } else {
      categoryId = rows[0].id;
    }

    const [result] = await pool.query(
      'INSERT INTO text_entries (title, text, summary, language, category_id) VALUES (?, ?, ?, ?, ?)',
      [title, text, summary, language, categoryId]
    );

    res.status(201).json({ id: result.insertId, message: 'Text entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all languages
app.get('/api/languages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM languages');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new translation entry
app.post('/api/translation-entries', async (req, res) => {
  const { originalText, translatedText, srcLanguage, destLanguage } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO translation_entries (original_text, translated_text, src, dest) VALUES (?, ?, ?, ?)',
      [originalText, translatedText, srcLanguage, destLanguage]
    );

    res.status(201).json({ id: result.insertId, message: 'Translation entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
