import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import { resetCredentials } from '@store/slices/authSlice';
import { useDispatch } from 'react-redux';

// 로그아웃 기능 추후 구현
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
