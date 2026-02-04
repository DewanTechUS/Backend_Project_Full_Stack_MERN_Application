// Centralized error handling (clean API responses)
// 404 Not Found handler and general error handler
// Usage: app.use(notFound); app.use(errorHandler);
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
// 404 Not Found handler
function notFound(req, res, next) {
  res.status(404);
  return next(new Error(`Not Found: ${req.originalUrl}`));
}
// General error handler
// Sends JSON response with error message and appropriate status code
// I use 4 arguments to identify it as an error handler middleware
function errorHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  if (res.headersSent) return next(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(err.errors)[0].message,
    });
  }
  // Mongoose bad ObjectId
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    message: err.message || "Server Error",
  });
}
console.log(green("YES - Error handling middleware loaded successfully"));
module.exports = { notFound, errorHandler };
