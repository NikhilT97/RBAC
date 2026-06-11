const Task = require("../Models/task.model");
const logActivity = require("../utils/logActivity");

const allTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });

    if (!tasks) {
      return res.status(400).json({ message: "No tasks found!" });
    }

    return res.status(200).json({ message: "Task List", tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching your tasks!", error: error.message });
  }
};

const readOneTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOne({
      _id: taskId,
      createdBy: req.user.id,
    });


    if (!task) {
      return res.status(400).json({ message: "No tasks found!" });
    }

    return res.status(200).json({ message: "Your Task fetched", task });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching your tasks!", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
     const task = await Task.create({ ...req.body, createdBy: req.user._id });
  await logActivity(req.user._id, 'task_created', `Created: ${task.title}`);
    res.status(201).json({ message: "Task Added Successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Task Not Added", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task Not found" });

     
    await logActivity(req.user._id, 'task_updated', `Updated: ${task.task}`);
    res.status(200).json({ message: "Task Updated Successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Not Updated", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: req.user.id
    });
    if (!task) return res.status(404).json({ message: "Task Not Found" });

    
    await logActivity(req.user._id, 'task_deleted', `Deleted: ${task.task}`);
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Unable to Delete", error: error.message });
  }
};

module.exports = { allTasks, readOneTask, createTask, updateTask, deleteTask };
