import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import removeLocalStorage from '@lib/utils/localStorage/removeLocalStorage';
import { resetCredentials } from '@store/slices/authSlice';
import { useDispatch } from 'react-redux';

function useLogout() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  async function logout() {
    try {
      await axiosPrivate.patch('/user/logout');
      dispatch(resetCredentials());
      removeLocalStorage('accessToken');
      removeLocalStorage('isKid');
      removeLocalStorage('provider');
    } catch (error) {
      console.error(error);
    }
  }
  return logout;
}

export default useLogout;
