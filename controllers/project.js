const Project = require('../models/project');

const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user._id
    });
    await project.save();
    return res.status(201).json(project);
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: "An error occurred", error: err.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy').populate('members').populate('bugs');
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json(project);
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: "Server error", error: err.message});
  }
};


const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json({message: "Project has been deleted."});
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: "Only project creator can delete!", error: err.message});
  }
}

const addMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .send({ error: "Only the project creator can add members" });
    }

    if (project.members.includes(user._id)) {
      return res
        .status(400)
        .send({ error: "User is already a member of the project" });
    }

    project.members.push(user._id);
    await project.save();

    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {createProject, getProject, deleteProject, addMember}