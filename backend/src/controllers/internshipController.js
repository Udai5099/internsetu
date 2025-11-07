const Internship = require("../models/Internship");

const countInternshipsByLocation = async (req, res) => {
  try {
    const results = await Internship.aggregate([
      {
        $group: {
          _id: { city: "$location.city", state: "$location.state" },
          totalInternships: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          city: "$_id.city",
          state: "$_id.state",
          totalInternships: 1
        }
      },
      { $sort: { state: 1, city: 1 } } // optional: sort nicely
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Company posts an internship
const createInternship = async (req, res) => {
  try {
    const { title, sector, openings, location, deadline } = req.body;

    if (!title || !sector || !openings || !location || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const internship = await Internship.create({
      company: req.user._id,
      title,
      sector,
      openings,
      location,
      deadline,
    });

    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all internships (students can view too)
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate("company", "name email");
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createInternship, getInternships,countInternshipsByLocation };
