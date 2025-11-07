const express = require('express');
const dotenv = require('dotenv');
const Connectdb = require("./src/config/dbconfig");
const cors = require('cors'); 
const app = express();

Connectdb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.get('/', (req, res) => res.send('API is running...'));

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/internships", require("./src/routes/internshipRoutes"));
app.use("/api/applications", require("./src/routes/applicationRoutes"));
app.use("/api/profile", require("./src/routes/profileRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));