const router = require("express").Router();
const { register, login, deleteMe } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
// Auth routes: register, login, delete my account
// User registration
router.post("/register", register);
// User login
router.post("/login", login);
// Delete my account
router.delete("/me", requireAuth, deleteMe);

module.exports = router;
