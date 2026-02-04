// Routes for task CRUD within a project
// Uses taskController
// parent projectId is in URL params
const router = require("express").Router({ mergeParams: true }); // mergeParams to access projectId // require auth middleware in main app
const taskCtrl = require("../controllers/taskController");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
// CRUD routes for tasks within a project
// parent projectId is in URL params
// all routes require auth middleware (applied in main app)
router.post("/", taskCtrl.createTask);
router.get("/", taskCtrl.getTasks);
router.put("/:taskId", taskCtrl.updateTask);
router.delete("/:taskId", taskCtrl.deleteTask);
console.log(green("YES - Task routes initialized"));
module.exports = router;
