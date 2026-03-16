CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  product_id INT NOT NULL
);