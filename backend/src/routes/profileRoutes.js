const express = require("express");
const multer = require("multer");
const { createOrUpdateProfile, getMyProfile } = require("../controllers/profileController");
const { protect, studentOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // create "uploads" folder in backend
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post("/", protect, studentOnly, upload.single("resume"), createOrUpdateProfile);

router.get("/", protect, studentOnly, getMyProfile);

module.exports = router;
