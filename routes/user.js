const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/user");
const { requireAuth } = require("../middlewares/auth");

// GET /api/user
router.get("/", requireAuth, getUser);
module.exports = router;
