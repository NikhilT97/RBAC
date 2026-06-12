
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, tasksRes] = await Promise.all([
          API.get('/admin/users'),
          API.get('/admin/tasks'),
        ]);

        const users = usersRes.data;
        const tasks = tasksRes.data;

        setStats({
          totalUsers: users.length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter(t => t.status === 'completed').length,
          pendingTasks: tasks.filter(t => t.status === 'pending').length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
     toast.success("See you soon Admin 💚");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex gap-4 items-center">
          <Link to="/admin/users" className="hover:underline">Users</Link>
          <Link to="/admin/tasks" className="hover:underline">Tasks</Link>
          <Link to="/admin/activity-logs" className="hover:underline">Logs</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Welcome, {user?.userName}!
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-lg shadow p-5 text-center">
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 text-center">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-purple-600">
              {stats.totalTasks}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 text-center">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.completedTasks}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 text-center">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.pendingTasks}
            </p>
          </div>

        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          
          <Link to="/admin/users"
            className="bg-blue-600 text-white rounded-lg p-6 text-center hover:bg-blue-700"
          >
            <p className="text-xl font-bold">Manage Users</p>
            <p className="text-sm mt-1 opacity-80">View, delete, update status</p>
          </Link>

          <Link to="/admin/tasks"
            className="bg-purple-600 text-white rounded-lg p-6 text-center hover:bg-purple-700"
          >
            <p className="text-xl font-bold">View All Tasks</p>
            <p className="text-sm mt-1 opacity-80">Monitor all user tasks</p>
          </Link>

          <Link to="/admin/activity-logs"
            className="bg-green-600 text-white rounded-lg p-6 text-center hover:bg-green-700"
          >
            <p className="text-xl font-bold">Activity Logs</p>
            <p className="text-sm mt-1 opacity-80">Track all user activity</p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;