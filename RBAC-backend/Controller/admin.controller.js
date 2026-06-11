const Task = require("../Models/task.model");
const User = require("../Models/user.model");
const ActivityLog = require("../models/ActivityLog");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

const updateUserStatus = async (req, res) => {
  const { status } = req.body; // 'active' or 'inactive'
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );
  res.json(user);
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("createdBy", "name email");
  res.json(tasks);
};

const getActivityLogs = async (req, res) => {
  const logs = await ActivityLog.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(logs);
};

module.exports = {
  getAllUsers,
  getAllTasks,
  deleteUser,
  updateUserStatus,
  getActivityLogs,
};
