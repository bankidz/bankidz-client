import { selectAccessToken, selectIsKid } from '@store/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';

function RequireAuth() {
  const accessToken = useAppSelector(selectAccessToken);
  const isKid = useAppSelector(selectIsKid);

  console.log('isKid in RequireAuth: ', isKid);
  console.log('truth test: ', isKid === null);

  if (accessToken === null) {
    return <Navigate to="/login" replace />;
  } else if (isKid === null) {
    return <Navigate to="/register/1" replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
