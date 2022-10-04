import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';
import { selectIsKid } from '@store/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';

function RequireAuth() {
  const accessToken = getLocalStorage('accessToken');
  const isKid = useAppSelector(selectIsKid);

  if (accessToken === null) {
    return <Navigate to="auth/login" replace />; // logout, revoke
  } else if (isKid === null) {
    return <Navigate to="auth/register/1" replace />; // unregistered
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
