
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Tasks from './pages/admin/Tasks';
import ActivityLogs from './pages/admin/ActivityLogs';
import ProtectedRoute from './components/ProtectedRoute';
 

function App() {
      const {user} = useAuth()
      
  return (

    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/dashboard" element={<UserDashboard />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/tasks" element={<Tasks />} />
        <Route path="/admin/activity-logs" element={<ActivityLogs />} />
      </Route>

      {/* Default Route */}
      <Route
        path="/"
        element={
          !user ? <Navigate to="/login" /> :
          user.role === 'admin' ? <Navigate to="/admin" /> :
          <Navigate to="/dashboard" />
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}

export default App;