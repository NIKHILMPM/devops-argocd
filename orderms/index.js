const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const OrderSchema = new mongoose.Schema({
  product: String,
  userId: String
});

const Order = mongoose.model("Order", OrderSchema);

async function startServer() {
  try {
    // Wait for Mongo connection
    await mongoose.connect('mongodb://mongodb:27017/microdb');
    console.log("MongoDB connected");

    // Seed only AFTER connection
    const count = await Order.countDocuments();
    if (count === 0) {
      await Order.insertMany([
        { product: "Laptop", userId: "1" },
        { product: "Mobile", userId: "2" },
        { product: "Headphones", userId: "3" }
      ]);
      console.log("Dummy orders inserted");
    }

    app.listen(3002, () => {
      console.log("Order Service running on port 3002");
    });

  } catch (err) {
    console.error("Mongo connection failed:", err);
  }
}

app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

startServer();
