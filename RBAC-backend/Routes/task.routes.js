const express = require("express");
const taskRoutes = express.Router();
const {
  allTasks,
  readOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../Controller/task.controller");
const { authMiddleware } = require("../Middleware/auth.middleware");
const { authorizeRoles } = require("../Middleware/role.middleware");

taskRoutes.use(authMiddleware);

taskRoutes.get("/", authorizeRoles("user"), allTasks);

//read one
taskRoutes.get("/:taskId", authorizeRoles("user"), readOneTask);

//create
taskRoutes.post("/", authorizeRoles("user"), createTask);

//update
taskRoutes.patch("/:taskId", authorizeRoles("user"), updateTask);

taskRoutes.delete("/:taskId", authorizeRoles("user","admin"), deleteTask);

module.exports = taskRoutes;

