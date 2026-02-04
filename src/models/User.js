// User model definition
// using console log is very dangerous in production environment
// as it may expose sensitive information
// ensure to remove or disable such logs before deploying to production
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
// User schema // we define the structure of user documents in MongoDB // along with validation rules// and pre-save hooks // we can also define instance methods // we can add more fields as needed
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true },
);

// Pre-save: hash password
userSchema.pre("save", async function () {
  // Only hash if password changed
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10); // 10 rounds of salting // more rounds = more secure but slower
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method: compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

console.log(green("YES - User model loaded successfully"));
module.exports = mongoose.model("User", userSchema);
