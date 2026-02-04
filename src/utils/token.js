// Creates JWT tokens for user authentication
// Payload includes userId // token expires in 7 days // requires JWT_SECRET in .env
// Usage: const { signToken } = require("../utils/token"); const token = signToken(user._id);
// you can genarate tokens with other payloads if needed by adjusting the function below
const jwt = require("jsonwebtoken");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
function signToken(userId) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing in .env");
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
console.log(green("YES - Token utility loaded successfully"));
module.exports = { signToken };

// You can generate a token using this command: which goes into your .env file as JWT_SECRET
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
