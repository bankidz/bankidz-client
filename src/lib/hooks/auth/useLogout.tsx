import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { resetCredentials } from '@store/slices/authSlice';
import { useDispatch } from 'react-redux';

// TODO: 로그아웃 기능 추후 구현 예정
function useLogout() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    dispatch(resetCredentials());
    try {
      const response = await axiosPrivate.get('/users/logout');
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
}

export default useLogout;
