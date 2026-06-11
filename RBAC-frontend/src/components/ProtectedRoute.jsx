
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // not logged in
  if (!user) return <Navigate to="/login" />;

  // if role doesn't match
  if (!allowedRoles.includes(user.role)) {
    return user.role === 'admin' 
      ? <Navigate to="/admin" /> 
      : <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;