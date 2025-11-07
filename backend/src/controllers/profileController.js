const Profile = require("../models/Profile");

const createOrUpdateProfile = async (req, res) => {
  try {
    const { age, gender, skills, interests, goalCompanies, bio } = req.body;

    let resumeUrl = null;
    if (req.file) {
      resumeUrl = `/uploads/${req.file.filename}`;
    }

    const profileData = {
      student: req.user._id,
      age,
      gender,
      skills: skills ? skills.split(",").map(s => s.trim()) : [],
      interests: interests ? interests.split(",").map(i => i.trim()) : [],
      goalCompanies: goalCompanies ? goalCompanies.split(",").map(g => g.trim()) : [],
      bio,
      ...(resumeUrl && { resumeUrl }),
    };

    const profile = await Profile.findOneAndUpdate(
      { student: req.user._id },
      profileData,
      { new: true, upsert: true }
    );

    res.json({ message: "Profile saved successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get logged-in student's profile
const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ student: req.user._id }).populate("student", "name email role");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrUpdateProfile, getMyProfile };
