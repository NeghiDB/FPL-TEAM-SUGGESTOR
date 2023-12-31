const mysql = require("mysql2/promise"); // Use the promise-based version

require('dotenv').config(); // Load environment variables from .env file

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    console.log("Connected");

    const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    const values = ['naugh','naugh@gmail.com','naugh'];

    const [result] = await connection.execute(sql, values);

    console.log("Records inserted:", result.affectedRows);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    // Close the connection when done
    await connection.end();
  }
}

run();