// Task schema
// Each task belongs to a project
// Owner is stored for fast authorization checks
// Supports status, priority, and optional due date
const mongoose = require("mongoose");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true, // add faster project -- tasks lookup
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    //  task note
    note: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // User-selected due date
    // Stored as Date so we can sort/filter overdue tasks later
    dueDate: {
      type: Date,
      default: null,
      index: true, // added allows sorting by upcoming deadlines
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  },
);
console.log(green("YES - Task model loaded successfully"));
module.exports = mongoose.model("Task", taskSchema);
