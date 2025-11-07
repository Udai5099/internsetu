const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes (any logged-in user)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) return res.status(404).json({ message: "User not found" });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Company-only middleware
const companyOnly = (req, res, next) => {
  if (req.user && req.user.role === "company") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Company only" });
  }
};

// Student-only middleware
const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Student only" });
  }
};

module.exports = { protect, companyOnly, studentOnly };
