import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to='/dang-nhap' replace />;

  if (allowedRoles && !allowedRoles.includes(user.staffType)) {
    return <Navigate to='/dang-nhap' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
