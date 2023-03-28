require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8000;

const uri = process.env.MONGODB_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/test", (req, res) => {
  res.send("Test");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
