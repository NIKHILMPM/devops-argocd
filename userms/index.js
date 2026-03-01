const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", UserSchema);

async function startServer() {
  try {
    await mongoose.connect('mongodb://mongodb:27017/microdb');
    console.log("MongoDB connected");

    // Seed after connection
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany([
        { name: "Nikhil", email: "nikhil@mail.com" },
        { name: "Rahul", email: "rahul@mail.com" },
        { name: "Priya", email: "priya@mail.com" }
      ]);
      console.log("Dummy users inserted");
    }

    app.listen(3001, () => {
      console.log("User Service running on  port 3001");
    });

  } catch (err) {
    console.error("Mongo connection failed:", err);
  }
}

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

startServer();
