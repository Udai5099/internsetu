/*const express = require('express');
const dotenv = require('dotenv');
const Connectdb = require("./src/config/dbconfig");
const cors = require('cors'); 
const app = express();

dotenv.config();
Connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Dynamic CORS for local + Render
//const allowedOrigins = [
//  'http://localhost:5173',
//  process.env.CLIENT_URL  // <-- for your deployed frontend
//
/*];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(cors({
    origin: "https://internsetu-4.onrender.com",  // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.get('/', (req, res) => res.send('API is running...'));

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/internships", require("./src/routes/internshipRoutes"));
app.use("/api/applications", require("./src/routes/applicationRoutes"));
app.use("/api/profile", require("./src/routes/profileRoutes"));

// ✅ Render sets PORT automatically
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);*/
const express = require('express');
const dotenv = require('dotenv');
const Connectdb = require("./src/config/dbconfig");
const cors = require('cors');

const app = express();

dotenv.config();
Connectdb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIXED CORS FOR RENDER (Frontend + Backend different domains)
app.use(cors({
    origin: "https://internsetu-4.onrender.com",   // your actual frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

// ✅ Allow OPTIONS requests for ALL routes (important for login)
app.options("*", cors());

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/internships", require("./src/routes/internshipRoutes"));
app.use("/api/applications", require("./src/routes/applicationRoutes"));
app.use("/api/profile", require("./src/routes/profileRoutes"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

