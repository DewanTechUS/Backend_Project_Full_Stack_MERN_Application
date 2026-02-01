// Handles register/login and returns JWT token
// Uses User model and token utility
// we can add more fields as needed
const User = require("../models/User");
const { signToken } = require("../utils/token");

// Register new user
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log("Register request body:", req.body);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, password are required" });
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user and generate token
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    return res.status(201).json({
      message: "Registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// Login user
async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Login request body:", req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    // Find user and validate password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const ok = await user.matchPassword(password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = signToken(user._id);

    return res.json({
      message: "Logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register, login };
