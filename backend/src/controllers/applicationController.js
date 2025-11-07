const Application = require("../models/Application");
const Internship = require("../models/Internship");
const User = require("../models/User");

const applyForInternship = async (req, res) => {
  try {
    const { internshipId } = req.body;

    const internship = await Internship.findById(internshipId);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    const existing = await Application.findOne({
      internship: internshipId,
      student: req.user._id,
    });
    if (existing) return res.status(400).json({ message: "You already applied" });

    const application = await Application.create({
      internship: internshipId,
      student: req.user._id,
    });

    res.status(201).json({ message: "Application submitted", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const applications = await Application.find({ internship: internshipId })
      .populate("student", "name email role")  
      .populate("internship", "title sector");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//need to add the email Notification
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body; 

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(applicationId).populate("student", "name email role");
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();

    res.json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  applyForInternship,
  getApplicants,
  updateApplicationStatus,
  getStudentProfile,
};
