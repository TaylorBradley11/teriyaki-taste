const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("."));

// load menu
app.get("/menu", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  res.json(data.menu);
});

// save order
app.post("/order", (req, res) => {
  const orders = fs.existsSync("orders.json")
    ? JSON.parse(fs.readFileSync("orders.json"))
    : [];

  orders.push(req.body);
  fs.writeFileSync("orders.json", JSON.stringify(orders));

  res.json({ success: true });
});

// get orders (admin)
app.get("/orders", (req, res) => {
  const orders = fs.existsSync("orders.json")
    ? JSON.parse(fs.readFileSync("orders.json"))
    : [];
  res.json(orders);
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
