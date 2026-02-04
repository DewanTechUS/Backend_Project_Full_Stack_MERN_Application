// Project CRUD with ownership authorization
// Rule: user can ONLY access projects they own
// Uses Project model
const Project = require("../models/Project");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
// POST /api/projects
async function createProject(req, res, next) {
  try {
    const { name, description, priority, dueDate } = req.body; // added dueDate // destructuring

    if (!name) {
      res.status(400);
      throw new Error("Project name is required");
    }

    const project = await Project.create({
      owner: req.user.userId,
      name,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : null, // added dueDate // parsing to Date or null
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

// GET /api/projects (only my projects)
async function getMyProjects(req, res, next) {
  try {
    const projects = await Project.find({ owner: req.user.userId }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:id (only if owner)
async function getProjectById(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.owner.toString() !== req.user.userId) {
      res.status(403);
      throw new Error(
        "Forbidden: Access denied. You do not have permission to access this project.",
      );
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
}

// PUT /api/projects/:id (only if owner)
async function updateProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.owner.toString() !== req.user.userId) {
      res.status(403);
      throw new Error(
        "Forbidden: Access denied. You do not have permission to access this project.",
      );
    }

    const { name, description, priority, dueDate } = req.body; // added dueDate // destructuring

    project.name = name ?? project.name;
    project.description = description ?? project.description;

    if (priority) project.priority = priority;
    if (dueDate !== undefined)
      project.dueDate = dueDate ? new Date(dueDate) : null; // added dueDate // parsing to Date or null

    const updated = await project.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/projects/:id (only if owner)
async function deleteProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.owner.toString() !== req.user.userId) {
      res.status(403);
      throw new Error(
        "Forbidden: Access denied. You do not have permission to access this project.",
      );
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
}
console.log(green("YES - Project controller loaded successfully"));
module.exports = {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
