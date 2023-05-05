const User = require("../models/user");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({id: user._id, name: user.name, email: user.email});
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { getUser };
