// Project CRUD with ownership authorization
// Rule: user can ONLY access projects they own // 
// Uses Project model
const Project = require("../models/Project");

// POST /api/projects
async function createProject(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Project name is required");
    }

    const project = await Project.create({
      owner: req.user.userId,
      name,
      description: description || "",
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

// GET /api/projects (only my projects)
async function getMyProjects(req, res, next) {
  try {
    const projects = await Project.find({ owner: req.user.userId }).sort({ createdAt: -1 });
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
      throw new Error("Forbidden: Access denied. You do not have permission to access this project.");
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
      throw new Error("Forbidden: Access denied. You do not have permission to access this project.");
    }

    project.name = req.body.name ?? project.name;
    project.description = req.body.description ?? project.description;

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
      throw new Error("Forbidden: Access denied. You do not have permission to access this project.");
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
