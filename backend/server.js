  const express = require("express");
  const mysql = require("mysql");
  const cors = require("cors");

  const app = express();
  const PORT = 8080;

  // Middleware
  app.use(express.json()); // To parse JSON request bodies
  app.use(cors()); // To allow cross-origin requests

  // Database connection
  const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if your MySQL user is different
    password: "5763", // Change if you have a password
    database: "fullstackapp", // Change to your actual database name
  });

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Connected to MySQL Database");
    }
  });

  // ✅ Create User API (POST)
  app.post("/api/user", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO user (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ id: result.insertId, name, email, message });
    });
  });

  // ✅ Fetch Users API (GET)
  app.get("/api/user", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
