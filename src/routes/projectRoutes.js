// Project routes: protected by JWT middleware

const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const projectCtrl = require("../controllers/projectController");
const taskRoutes = require("./taskRoutes");
// colors for console logs
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;
router.use(requireAuth);
// Project routes
router.post("/", projectCtrl.createProject);
router.get("/", projectCtrl.getMyProjects);
router.get("/:id", projectCtrl.getProjectById);
router.put("/:id", projectCtrl.updateProject);
router.delete("/:id", projectCtrl.deleteProject);
// Nested task routes
router.use("/:projectId/tasks", taskRoutes);
console.log(green("YES - Project routes initialized"));
module.exports = router;
