const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/auth");
const { createProject, getProject, deleteProject, addMember } = require("../controllers/project");



// create a project
router.post('/', requireAuth, createProject)
// get a project by id
router.post("/:id", requireAuth, getProject);
// delete a project 
router.post("/:id", requireAuth, deleteProject);

// add a member to a project
router.post('/:id/members', requireAuth, addMember)


module.exports = router