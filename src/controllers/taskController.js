// Task CRUD under a project
// user must OWN the parent project to manage tasks
// Uses Project and Task models
// nested crud for tasks under projects
const Project = require("../models/Project");
const Task = require("../models/Task");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
// Helper confirm project exists and belongs to logged-in user
async function verifyProjectOwner(projectId, userId) {
  const project = await Project.findById(projectId);

  if (!project) {
    return { ok: false, status: 404, message: "Project not found" };
  }

  if (project.owner.toString() !== userId) {
    return { ok: false, status: 403, message: "Forbidden: not your project" };
  }

  return { ok: true, project };
}

// POST /api/projects/:projectId/tasks
async function createTask(req, res, next) {
  try {
    const { projectId } = req.params;

    const check = await verifyProjectOwner(projectId, req.user.userId);
    if (!check.ok) {
      res.status(check.status);
      throw new Error(check.message);
    }

    const { title, description, status, priority } = req.body; // added priority
    if (!title) {
      res.status(400);
      throw new Error("Task title is required");
    }

    const task = await Task.create({
      project: projectId,
      owner: req.user.userId,
      title,
      description: description || "",
      status: status || "To Do",
      priority: priority || "medium", // added priority
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:projectId/tasks
async function getTasks(req, res, next) {
  try {
    const { projectId } = req.params;

    const check = await verifyProjectOwner(projectId, req.user.userId);
    if (!check.ok) {
      res.status(check.status);
      throw new Error(check.message);
    }

    const tasks = await Task.find({
      project: projectId,
      owner: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

// PUT /api/projects/:projectId/tasks/:taskId
async function updateTask(req, res, next) {
  try {
    const { projectId, taskId } = req.params;

    const check = await verifyProjectOwner(projectId, req.user.userId);
    if (!check.ok) {
      res.status(check.status);
      throw new Error(check.message);
    }

    const task = await Task.findOne({
      _id: taskId,
      project: projectId,
      owner: req.user.userId,
    });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    // Update fields if provided in body // save updated task // i can add more fields as needed based on schema
    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;

    // added: update priority if provided
    if (req.body.priority) task.priority = req.body.priority;

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/projects/:projectId/tasks/:taskId
async function deleteTask(req, res, next) {
  try {
    const { projectId, taskId } = req.params;

    const check = await verifyProjectOwner(projectId, req.user.userId);
    if (!check.ok) {
      res.status(check.status);
      throw new Error(check.message);
    }
    // Find and delete task by id, project, and owner // for extra security
    const task = await Task.findOne({
      _id: taskId,
      project: projectId,
      owner: req.user.userId,
    });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
}
console.log(green("YES - Task controller loaded successfully"));
module.exports = { createTask, getTasks, updateTask, deleteTask };
