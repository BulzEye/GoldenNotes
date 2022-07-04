const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.login_post);
router.post("/signup", authController.signup_post);

module.exports = router;