// Centralized error handling (clean API responses)
// 404 Not Found handler and general error handler
// Usage: app.use(notFound); app.use(errorHandler);
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

module.exports = { notFound, errorHandler };
