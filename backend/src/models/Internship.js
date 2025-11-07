const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  sector: { type: String, required: true },
  openings: { type: Number, required: true },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  deadline: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);
