const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3002;

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "minirent",
  port: 5432
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", service: "reservation-service" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.get("/reservations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservations ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/reservations", async (req, res) => {
  const { customer_name, product_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO reservations (customer_name, product_id) VALUES ($1, $2) RETURNING *",
      [customer_name, product_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`reservation-service running on port ${port}`);
});