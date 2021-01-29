const mongoose = require("mongoose");
const config = require("config");
const { connect } = require("../routes/api/users");
const db = config.get("mongoURI");

// Connects to mongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exits process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
