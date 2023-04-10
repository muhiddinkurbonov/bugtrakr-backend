const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/auth");
const { createBug, getAllBugs } = require("../controllers/bug");

// POST /api/bugs
router.post("/", requireAuth, createBug);

// GET /api/bugs
router.get("/", requireAuth, getAllBugs);


module.exports = router;