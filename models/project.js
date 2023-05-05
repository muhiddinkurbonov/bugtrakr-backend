const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  bugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
