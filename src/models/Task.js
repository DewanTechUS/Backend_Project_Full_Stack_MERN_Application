// Task schema
// Each task belongs to a project
// Owner is stored for fast authorization checks
// Supports status, priority, and optional due date

const mongoose = require("mongoose");

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
  }
);

module.exports = mongoose.model("Task", taskSchema);
