// Routes for task CRUD within a project
// Uses taskController
// parent projectId is in URL params
const router = require("express").Router({ mergeParams: true }); // mergeParams to access projectId // require auth middleware in main app
const taskCtrl = require("../controllers/taskController");
// CRUD routes for tasks within a project
// parent projectId is in URL params
// all routes require auth middleware (applied in main app)
router.post("/", taskCtrl.createTask);
router.get("/", taskCtrl.getTasks);
router.put("/:taskId", taskCtrl.updateTask);
router.delete("/:taskId", taskCtrl.deleteTask);

module.exports = router;
