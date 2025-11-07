const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect, companyOnly, studentOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Register (student or company)
router.post("/register", registerUser);

// Login (student or company)
router.post("/login", loginUser);

// ✅ Example: profile for any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Your profile", user: req.user });
});

// ✅ Example: company dashboard
router.get("/company-dashboard", protect, companyOnly, (req, res) => {
  res.json({ message: "Welcome to Company Dashboard", user: req.user });
});

// ✅ Example: student dashboard
router.get("/student-dashboard", protect, studentOnly, (req, res) => {
  res.json({ message: "Welcome to Student Dashboard", user: req.user });
});

module.exports = router;
