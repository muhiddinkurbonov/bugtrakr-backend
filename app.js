require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth')
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


app.use(express.json());


app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


