const router = require("express").Router();
const { register, login, deleteMe } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");

// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
// Auth routes: register, login, delete my account
// User registration
router.post("/register", register);
// User login
router.post("/login", login);
// Delete my account
router.delete("/me", requireAuth, deleteMe);
console.log(green("YES - Auth routes initialized"));
module.exports = router;
