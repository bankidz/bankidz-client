import { selectAccessToken, selectIsKid } from '@store/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';

function RequireAuth() {
  const accessToken = useAppSelector(selectAccessToken);
  const isKid = useAppSelector(selectIsKid);

  if (accessToken === '') {
    return <Navigate to="auth/login" replace />;
  } else if (isKid === null) {
    return <Navigate to="auth/register/1" replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
