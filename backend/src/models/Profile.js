const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one profile per student
  },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  skills: [String],
  interests: [String],
  goalCompanies: [String],
  bio: { type: String },
  resumeUrl: { type: String }, // store file path or cloud link
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
