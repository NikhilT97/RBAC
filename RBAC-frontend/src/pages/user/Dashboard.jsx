import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import toast from "react-hot-toast";
const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    try {
      await API.post("/tasks", { task: newTask });
      toast.success("Task added 💚");
      setNewTask("");
      fetchTasks();
    } catch (err) {
      toast.error(err);

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      await API.patch(`/tasks/${id}`, { status: newStatus });
      toast.success("Status updated 💚");

      fetchTasks();
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task Deleted 💚");

      fetchTasks();
    } catch (err) {
      toast.error(err);

      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("See you soon 💚");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Tasks</h1>
        <div className="flex items-center gap-4">
          <span>Hi, {user?.userName}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6 max-w-2xl mx-auto">
        {/* Create Task */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Add a new task..."
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-2xl font-bold text-blue-600">{tasks?.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {tasks?.filter((t) => t.status === "completed").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {tasks?.filter((t) => t.status === "pending").length}
            </p>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks?.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              No tasks yet — add one above!
            </div>
          ) : (
            tasks?.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm ${
                      task.status === "completed"
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.task}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusToggle(task._id, task.status)}
                    className={`px-3 py-1 rounded text-sm text-white ${
                      task.status === "pending"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {task.status === "pending" ? "Complete" : "Undo"}
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
