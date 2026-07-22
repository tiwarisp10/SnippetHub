const express = require("express");
const protect = require("../middleware/authMiddleware");
const {registerUser,loginUser,getCurrentUser,logoutUser,changePassword,} = require("../controllers/authController");

const router = express.Router();

// =============================
// AUTH ROUTES
// =============================

// Register User
router.post("/register", registerUser);
// Login User
router.post("/login", loginUser);

// Get Current User
router.get("/me", protect, getCurrentUser);
router.post("/logout", logoutUser);
router.put("/change-password", protect, changePassword);

module.exports = router;