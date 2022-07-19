import { selectAuth } from '@store/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';

function RequireAuth() {
  const auth = useAppSelector(selectAuth);

  if (auth.accessToken === null) {
    return <Navigate to="/login" replace />;
  } else if (auth.isKid === null) {
    return <Navigate to="/register/1" replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
