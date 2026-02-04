// Protects routes by verifying JWT (Authorization: Bearer <token>)
// If valid, attaches userId to req.user
// Usage: app.get('/protected', requireAuth, (req, res) => { ... });
// Adjust token payload structure as needed
const jwt = require("jsonwebtoken");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  // Must be: "Bearer <token>"
  // Check header presence and format
  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjust this to match what you store in the token payload (e.g., userId, id, _id) how you store it
    req.user = { userId: decoded.userId || decoded.id || decoded._id };

    if (!req.user.userId) {
      return res.status(401).json({ message: "Token payload missing userId" });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
}
console.log(green("YES - Auth middleware loaded successfully"));
module.exports = { requireAuth };
