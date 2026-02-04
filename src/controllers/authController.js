const User = require("../models/User");
const Project = require("../models/Project");
const { signToken } = require("../utils/token");
// const asyncHandler = require("../middleware/asyncHandler");
// Register a new user
// POST /api/auth/register
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("name, email, password are required");
    }
// Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      throw new Error("Email already exists");
    }
// Create user
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}
//Login user
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("email and password are required");
    }
// Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
 // Check password
    const ok = await user.matchPassword(password);
    if (!ok) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
// Generate token
    const token = signToken(user._id);

    res.json({
      message: "Logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}
// Delete current user
async function deleteMe(req, res, next) {
  try {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      res.status(401);
      throw new Error("Not authorized");
    }

    // delete projects and tasks if tasks embedded in projects
    await Project.deleteMany({ owner: userId });

    // delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, deleteMe };
