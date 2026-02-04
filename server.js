// server.js
// Pro-Tasker API entry point (Express + Mongo + routes)
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;

console.log(green("YES - Pro-Tasker API bootstrap started"));

// Load environment variables from .env file
require("dotenv").config();

// install express and other dependencies // cors is important for cross-origin requests
const express = require("express");
const cors = require("cors");
const path = require("path");

// Initialize Express app
// Use PORT from env or default to 3000
const app = express();
const PORT = process.env.PORT || 3000;

// Database & Middleware imports
const connectDB = require("./src/config/db");
const { notFound, errorHandler } = require("./src/middleware/errorHandler");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");

// configure middleware // console log each step for clarity
console.log(yellow("YES - Middleware initialization started"));

// Request logger
app.use((req, res, next) => {
  console.log(`YES - Incoming request | ${req.method} ${req.originalUrl}`);
  next();
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(green("YES - Body parser middleware initialized"));

// CORS configuration
const allowedOrigins = [
  ...new Set(
    [process.env.CLIENT_ORIGIN, "http://localhost:3001", "http://localhost:3000"].filter(Boolean)
  ),
];

app.use(cors({ origin: allowedOrigins }));
console.log(green("YES - CORS middleware initialized"), allowedOrigins);

// Static files (optional, safe)
app.use(express.static(path.join(__dirname, "public")));

// Routes
console.log(green("YES - Route initialization started"));
// Basic root route
app.get("/", (req, res) => {
  res.json({ message: "Dewan Mahmud's Pro-Tasker API running" });
});
// Health check route
app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});
// Auth routes
app.use("/api/auth", authRoutes);
console.log(green("YES - Auth routes mounted at /api/auth"));
// Project routes
app.use("/api/projects", projectRoutes);
console.log(green("YES - Project routes mounted at /api/projects"));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);
console.log(green("YES - Error handling middleware initialized"));

// Start Server
(async () => {
  try {
    console.log(green("INIT - MongoDB connection initialization started"));
    await connectDB();
    console.log(green("YES - MongoDB connected"));

    app.listen(PORT, () => {
      console.log(green("--------------------------------------------------"));
      console.log(blue(`YES - Backend server running at http://localhost:${PORT}`));
      console.log(green("YES - Backend server is ready to accept requests"));
      console.log(green("--------------------------------------------------"));
    });
  } catch (err) {
    console.error(red("NO - Failed to start server:"), err.message);
  }
})();
