import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';
import { selectIsRegistered } from '../../store/slices/authSlice';

function RequireRegistered() {
  const isRegistered = useAppSelector(selectIsRegistered);
  if (isRegistered) {
    <Navigate to="/profile" />;
  }
  return <Outlet />;
}

export default RequireRegistered;

// const { auth } = useAuth();
// const location = useLocation();
// return (
//     auth?.roles?.find(role => allowedRoles?.includes(role))
//         ? <Outlet />
//         : auth?.accessToken //changed from user to accessToken to persist login after refresh
//             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//             : <Navigate to="/login" state={{ from: location }} replace />
// );
