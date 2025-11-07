const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  /*name: {
    type: String,
    required: [true, "Please enter a name"],
  },*/
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  role: {
    type: String,
    enum: ["student", "company"],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);