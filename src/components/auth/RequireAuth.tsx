import { selectAuth } from '@store/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';

// require register
// 추후 auth에 의한 구분 로직 추가 예정
function RequireAuth() {
  const auth = useAppSelector(selectAuth);

  console.log(auth);
  if (auth.accessToken === null) {
    return <Navigate to="/login" replace />;
  } else if (auth.isKid === null) {
    return <Navigate to="/register/1" replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
