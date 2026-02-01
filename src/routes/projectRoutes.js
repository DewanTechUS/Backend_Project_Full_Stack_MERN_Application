// Project routes: protected by JWT middleware

const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const projectCtrl = require("../controllers/projectController");
const taskRoutes = require("./taskRoutes");

router.use(requireAuth);
// Project routes
router.post("/", projectCtrl.createProject);
router.get("/", projectCtrl.getMyProjects);
router.get("/:id", projectCtrl.getProjectById);
router.put("/:id", projectCtrl.updateProject);
router.delete("/:id", projectCtrl.deleteProject);
// Nested task routes
router.use("/:projectId/tasks", taskRoutes);

module.exports = router;
