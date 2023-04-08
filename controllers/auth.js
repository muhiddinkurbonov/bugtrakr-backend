const User = require("../models/User");
const { hash } = require("bcryptjs");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    // check if user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(500).json({
        message: "User already exists! Try logging in.",
      });
    }
    // if user doesn't exist, create a new user, hash the password
    const passwordHashed = await hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: passwordHashed,
    });
    // save user to database
    await newUser.save();
    return res.status(200).json({
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(401).json({
      message: "User creation not successful",
      error: error.message,
    });
  }
};

module.exports = { register };
