// Routes for user authentication (register/login)
// Uses authController
// to handle user registration and login

const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
