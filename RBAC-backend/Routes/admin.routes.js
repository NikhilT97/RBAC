const express = require('express');
const { authMiddleware } = require('../Middleware/auth.middleware');
const { authorizeRoles } = require('../Middleware/role.middleware');
const { getAllUsers, deleteUser, getAllTasks,updateUserStatus, getActivityLogs} = require('../Controller/admin.controller');
const adminOnly = require('../Middleware/adminOnly');
const adminRouter = express.Router();


adminRouter.use(authMiddleware, adminOnly);

adminRouter.get('/users', getAllUsers);
adminRouter.delete('/users/:id', deleteUser);
adminRouter.patch('/users/:id/status', updateUserStatus);
adminRouter.get('/tasks', getAllTasks);
adminRouter.get('/activity-logs', getActivityLogs);

module.exports = adminRouter