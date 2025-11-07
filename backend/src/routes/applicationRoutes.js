const express = require("express");
const {
  applyForInternship,
  getApplicants,
  updateApplicationStatus,
  getStudentProfile,
} = require("../controllers/applicationController");
const { protect, studentOnly, companyOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Student applies for internship
router.post("/", protect, studentOnly, applyForInternship);

// Company views applicants
router.get("/:internshipId", protect, companyOnly, getApplicants);

// Company updates application status
router.put("/status/:applicationId", protect, companyOnly, updateApplicationStatus);

// Company views student profile
router.get("/student/:studentId", protect, companyOnly, getStudentProfile);

module.exports = router;
