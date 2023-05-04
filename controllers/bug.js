const Bug = require("../models/bug");

const createBug = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo, createdBy } = req.body;
    const newBug = new Bug({
      title,
      description,
      priority,
      status,
      createdBy,
    });
    const savedBug = await newBug.save();
    return res.status(201).json(savedBug);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred", erro: error.message });
  }
};

const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().populate("createdBy", "email");
    return res.status(200).json(bugs);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
};


module.exports = {
  createBug,
  getAllBugs
}