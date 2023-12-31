const express = require('express');
const mysql = require('mysql2/promise');

const bcrypt = require('bcrypt');

require('dotenv').config(); // Load environment variables from .env file


const app = express();
const port = 7080;

// MySQL database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware to parse JSON requests
app.use(express.json());

// Example CRUD operations

/* // Create operation
app.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  const [rows] = await pool.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, password]);
  res.json(rows);
}); */

// Create operation
app.post('/users', async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  try {
    const [rows] = await pool.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/* // Read operation
app.get('/users', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM users');
  res.json(rows);
});

// Update operation
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const [rows] = await pool.execute('UPDATE users SET username = ?, email = ?, password_hash = ? WHERE id = ?', [username, email, password, id]);
  res.json(rows);
});

// Delete operation
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  res.json(rows);
}); */

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
