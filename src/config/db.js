// Connects to MongoDB Atlas using Mongoose
// and handles connection success and error logging
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const mongoose = require("mongoose");
// Load environment variables from .env file
async function connectDB() {
  const uri = process.env.MONGODB_URI; // we can use or operator and then use different for fallback here
 // console.log("MONGODB_URI:", uri); // Debugging line to check the URI // THIS WILL LEAK SENSITIVE INFO
  
 if (!uri) throw new Error("MONGODB_URI is missing in .env");
console.log(yellow("CONNECTING - MongoDB connection in progress..."));
 

  try {
    await mongoose.connect(uri);
    console.log(green("YES - MongoDB connected successfully"));

    //  mongoose.set("debug", true); // Enable Mongoose debug mode
  } catch (err) {
    console.log(red("NO - MongoDB connection failed"));
  }
}

module.exports = connectDB;