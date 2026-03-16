const express = require("express");
const app = express();
const port = 3001;

const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 29 },
  { id: 3, name: "Keyboard", price: 79 }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "catalog-service" });
});

app.listen(port, () => {
  console.log(`catalog-service running on port ${port}`);
});