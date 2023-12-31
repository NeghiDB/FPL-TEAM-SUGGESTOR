const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// MySQL Connection Pooling
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API endpoint to insert a new user
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const connection = await pool.getConnection();
    const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    const values = [username, email, password];

    const [result] = await connection.execute(sql, values);
    connection.release();

    res.json({ message: 'User inserted successfully', affectedRows: result.affectedRows });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to retrieve all users
app.get('/api/users', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users');
    connection.release();

    res.json({ users: rows });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});