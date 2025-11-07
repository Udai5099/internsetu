const mongoose = require("mongoose");
const { ATLAS_DB_URL } = require("./serverconfig");

async function Connectdb() {
  try {
    await mongoose.connect(ATLAS_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      
    });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = Connectdb;
