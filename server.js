// server.js // Notes for faster presentation
// Pro-Tasker API entry point (Express + Mongo + routes)
//
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;


console.log(green("YES - Pro-Tasker API bootstrap started"));

// Component load tracking: I want to ensure all components load properly, like an indicator.
const COMPONENTS_TOTAL = 8;
let componentsLoaded = 0;

const loadSuccess = (componentName) => {
  componentsLoaded++;
  console.log(green(`YES - Component loaded successfully: ${componentName}`));
};

const loadFail = (componentName, error) => {
  console.error(red(`NO - Component failed to load: ${componentName}`));
  if (error?.message) console.error(red(`NO - Reason: ${error.message}`));
};

// Load environment variables
require("dotenv").config();
loadSuccess("dotenv");
//console.log("YES DANGER - Environment variables loaded:", process.env); // NOT RECOMMENDED FOR PRODUCTION

// Import dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import DB connection + error handlers
const connectDB = require("./src/config/db");
const { notFound, errorHandler } = require("./src/middleware/errorHandler");

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

loadSuccess("Express application");
console.log(
  green(`YES - Express application initialized successfully (PORT: ${PORT})`)
);

// middleware
console.log(yellow("YES - Middleware initialization started"));

// logger // request logger middleware
app.use((req, res, next) => {
  console.log(`YES - Incoming request | ${req.method} ${req.originalUrl}`);
  next();
});

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(green("YES - Body parser middleware initialized successfully"));
loadSuccess("Middleware (logger + body parsers)");

// cors // Cross-Origin Resource Sharing
const allowedOrigins = [
  ...new Set(
    [process.env.CLIENT_ORIGIN, "http://localhost:3000"].filter(Boolean)
  ),
];

console.log(green("YES - CORS allowed origins loaded:"), allowedOrigins);

app.use(cors({ origin: allowedOrigins }));
console.log(green("YES - CORS middleware initialized successfully"));
loadSuccess("CORS");

// Static file server for public assets
app.use(express.static(path.join(__dirname, "public")));
console.log(green("YES - Static file server initialized (/public)"));
loadSuccess("Static file server");

// Routes
console.log(green("YES - Route initialization started"));
// Root route
app.get("/", (req, res) => {
  console.log(green("YES - Root route handler executed"));
  res.json({ message: "Dewan Mahmud's Pro-Tasker API running" });
});

// Health check route
app.get("/health", (req, res) => {
  console.log(green("YES - Health check route handler executed"));
  res.json({ message: "Dewan Mahmud's Pro-Tasker API running" });
});

// Auth routes
console.log(green("YES - Auth routes initialized (/api/auth)"));
app.use("/api/auth", authRoutes);

// Project routes
console.log(green("YES - Project routes initialized (/api/projects)"));
app.use("/api/projects", projectRoutes);

loadSuccess("API routes");

// Error handling middleware
console.log(green("YES - Error handling middleware initialized"));

app.use(notFound);
app.use(errorHandler);

loadSuccess("Error handling");

// Start server after DB connection
(async () => {
  try {
    console.log(green("INIT - MongoDB connection initialization started"));
    await connectDB();
    console.log(green("YES - MongoDB connection initialized successfully"));
    loadSuccess("MongoDB");

    app.listen(PORT, () => {
      console.log(green("YES - HTTP server initialized successfully"));

      console.log(green("--------------------------------------------------"));
      console.log(
        green(`YES - Components loaded: ${componentsLoaded}/${COMPONENTS_TOTAL}`)
      );

      if (componentsLoaded === COMPONENTS_TOTAL) {
        console.log(green("YES - All backend components loaded successfully"));
        console.log(green("YES - Backend server is ready to accept requests"));
      } else {
        console.log(red("NO - Some backend components were not loaded"));
      }

      console.log(
        blue(`YES - Backend server running at http://localhost:${PORT}`)
      );

      console.log(green("--------------------------------------------------"));
    });
  } catch (error) {
    loadFail("Backend startup", error);
  }
})();
