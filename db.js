const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URL || ''; /// test string 

async function connectDB() {
  try {
    await  mongoose.connect(MONGO_URI, {
      //PARAMS
    });
    console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Stop the app if DB connection fails
    }
}

module.exports = connectDB

