require("dotenv").config();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  try {
    // check if user exists
    const user = await User.findOne({ email });
    // if user dosn't exist return error
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }

    // compare passwrods
    const passwordIsValid = compare(password, user.password);

    // check if password is valid
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    //sign token with u
    var token = jwt.sign(
      {
        id: user._id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.cookie("access_token", token, {
      maxAge: 86400 * 1000, // cookie will expire after 24 hours
      httpOnly: true, // cookie cannot be accessed via client-side script
      secure: process.env.NODE_ENV === "production", // cookie will only be sent over HTTPS in production environment
      signed: true
    });

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      message: "Login successfull",
      accessToken: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const logout = (req, res, next) => {
  res.clearCookie("access_token");
  res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = { register, login, logout };
