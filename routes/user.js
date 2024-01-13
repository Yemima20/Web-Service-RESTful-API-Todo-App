const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

// generate token
const generateJwt = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET, { expiresIn: "10d" });
};

// register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  
  // get error if user already register
  if (existingUser) {
    return res.status(400).json({ message: "Already registered" });
  }

  // make new user
  const user = new User({
    name,
    email,
    password,
  });
  const saveUser = await user.save();
  res.json({
    message: "Successfully registered!",
    userId: saveUser._id,
    token: generateJwt(saveUser._id),
  });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // check for user existence
  if (!user) {
    return res.status(400).json({ message: "Invalid information, no user found." });
  }

  // validate the password
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    res.json({
      message: "Succesfully log in!",
      userId: user._id,
      token: generateJwt(user._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid information. Either wrong email or password" });
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all users" });
  }
});

// export router
module.exports = router;