const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your MySQL password
  database: "sorsu_mart"
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected");
});

/* =======================
   FRONTEND (INDEX HTML)
======================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SorSU Mart</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>SorSU Mart</h1>
<p>Student-made food products</p>

<h2>Featured Products</h2>
<div id="product-grid"></div>

<script>
fetch("/api/products")
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById("product-grid");

    products.forEach(p => {
      const div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.margin = "10px";
      div.style.padding = "10px";

      div.innerHTML = \`
        <h3>\${p.name}</h3>
        <p>₱\${p.price}</p>
        <button onclick="addToCart(\${p.id})">Add to Cart</button>
      \`;

      grid.appendChild(div);
    });
  });

function addToCart(id) {
  fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: id, quantity: 1 })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}
</script>

</body>
</html>
  `);
});

/* =======================
   API ROUTES
======================= */

// GET PRODUCTS
app.get("/api/products", (req, res) => {
  db.query("SELECT id, name, price FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD TO CART
app.post("/api/cart/add", (req, res) => {
  const { product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
    [product_id, quantity],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Added to cart" });
    }
  );
});

/* =======================
   START SERVER
======================= */
app.listen(5000, () => {
  console.log("🚀 One-file app running at http://localhost:5000");
});