const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("."));

// GET MENU
app.get("/menu", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  res.json(data.menu);
});

// SAVE ORDER
app.post("/order", (req, res) => {
  let orders = [];

  if (fs.existsSync("orders.json")) {
    orders = JSON.parse(fs.readFileSync("orders.json"));
  }

  orders.push({
    id: Date.now(),
    items: req.body.items,
    total: req.body.total
  });

  fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

  res.json({ success: true });
});

// GET ORDERS (ADMIN)
app.get("/orders", (req, res) => {
  if (!fs.existsSync("orders.json")) return res.json([]);
  const orders = JSON.parse(fs.readFileSync("./orders.json"));
  res.json(orders);
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
