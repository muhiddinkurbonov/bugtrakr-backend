require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user');
const bugRoutes = require("./routes/bug");
const app = express();
const cookieParser = require('cookie-parser');

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

app.use(cookieParser(process.env.API_SECRET));
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bugs", bugRoutes);



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


