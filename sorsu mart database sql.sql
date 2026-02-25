CREATE DATABASE sorsu_mart;
USE sorsu_mart;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  image VARCHAR(255),
  category VARCHAR(50)
);

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, price) VALUES
('Chicken Pastil', 35),
('Banana Cue', 20),
('Brownies', 50);