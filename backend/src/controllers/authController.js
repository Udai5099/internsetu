const { sendEmail } = require("../config/emailService");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function: generate JWT
const generateToken = (id,role) => {
  return jwt.sign({ id ,role}, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register
const registerUser = async (req, res) => {
  const { email, password,role} = req.body;

  try {
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role: role || "student", 
    });
    await sendEmail(
      user.email,
      "🎉 Welcome to SIH Internship Portal!",
      `<p>Hi ${user.name},</p>
       <p>Welcome to our Internship Portal. You have successfully registered as a <b>${role}</b>.</p>
       <p>We will notify you about opportunities, applications, and updates.</p>
       <br/>
       <p>Best regards,</p>
       <p><b>SIH Internship Team</b></p>`
    );

res.status(201).json({
  _id: user._id,
  email: user.email, 
  role: user.role || "student",
  token: generateToken(user._id),
  isNewUser: true
});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
 await sendEmail(
        user.email,
        "🔔 Login Alert - SIH Internship Portal",
        `<p>Hi ${user.name},</p>
         <p>You just logged in to your account.</p>
         <p>If this wasn't you, please reset your password immediately.</p>
         <br/>
         <p>Best regards,</p>
         <p><b>SIH Internship Team</b></p>`
      );
   res.json({
  _id: user._id,
  email: user.email,
  role: user.role,
  token: generateToken(user._id),
  isNewUser: false
});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
