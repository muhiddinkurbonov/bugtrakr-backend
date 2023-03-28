require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/test", (req, res) => {
  res.send("Test");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
