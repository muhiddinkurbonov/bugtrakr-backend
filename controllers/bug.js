const Project = require("../models/project");
const Bug = require("../models/bug");

const createBug = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const bug = new Bug({
      ...req.body,
      projectId: req.params.projectId,
      createdBy: req.id,
    });
    await bug.save();

    project.bugs.push(bug._id);
    await project.save();

    return res.status(201).json(bug);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "An error occurred.", error: err.message });
  }
};

const getBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id).populate("projectId");
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    return res.json(bug);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error has occurred.", error: err.message });
  }
};

const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().populate("createdBy").populate("project");
    return res.json(bugs);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error has occurred.", error: err.message });
  }
};

const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.id },
      req.body,
      { new: true }
    );
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    return res.json(bug);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error has occurred.", error: err.message });
  }
};

const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.id,
    });
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    const project = await Project.findById(bug.projectId);
    project.bugs.pull(bug._id);
    await project.save();

    return res.json({ message: "Bug has been deleted." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "An error has occurred.",
      error: err.message,
    });
  }
};

module.exports = { createBug, getBug, getAllBugs, updateBug, deleteBug };
