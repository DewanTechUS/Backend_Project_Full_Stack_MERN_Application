// Project model definition 
// each project is owned by a user
// we can add more fields as needed
// for example: dueDate, status, etc.
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
