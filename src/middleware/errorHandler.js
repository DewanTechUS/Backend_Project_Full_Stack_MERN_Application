// Centralized error handling (clean API responses)
// 404 Not Found handler and general error handler
// Usage: app.use(notFound); app.use(errorHandler);
function notFound(req, res, next) {
  res.status(404);
  return next(new Error(`Not Found: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  // If headers already sent, let Express handle it // avoid "Headers already sent" error
  // using 4-argument signature to identify error-handling middleware
  if (res.headersSent) return next(err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    message: err.message || "Server Error",
  });
}

module.exports = { notFound, errorHandler }; 
