const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/Eshop");
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
