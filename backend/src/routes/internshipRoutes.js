const express = require("express");
const { createInternship, getInternships } = require("../controllers/internshipController");
const { protect, companyOnly } = require("../middleware/authMiddleware");
const { countInternshipsByLocation } = require("../controllers/internshipController");

const router = express.Router();
// Count internships by location
router.get("/count-by-location", countInternshipsByLocation);

// Company posts internship
router.post("/", protect, companyOnly, createInternship);

// Students (and everyone) can see internships
router.get("/", getInternships);

module.exports = router;
