const mysql = require("mysql2/promise"); // Use the promise-based version

async function run() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fplteamsuggestor",
  });

  try {
    console.log("Connected");

    const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    const values = ['naughty', 'naughty@gmail.com', 'naughty'];

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
