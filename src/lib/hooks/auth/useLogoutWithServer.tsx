import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import removeLocalStorage from '@lib/utils/localStorage/removeLocalStorage';
import { resetCredentials } from '@store/slices/authSlice';
import { useDispatch } from 'react-redux';

function useLogoutWithServer() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  async function logoutWithServer() {
    try {
      await axiosPrivate.patch('/user/logout');
      dispatch(resetCredentials());
      removeLocalStorage('accessToken');
    } catch (error) {
      console.error(error);
    }
  }
  return logoutWithServer;
}

export default useLogoutWithServer;
