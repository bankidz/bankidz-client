import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { resetCredentials } from '@store/slices/authSlice';
import { useDispatch } from 'react-redux';

function useLogout() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    dispatch(resetCredentials());
    try {
      const response = await axiosPrivate.patch('/users/logout');
      console.log('logout response: ', response);
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
}

export default useLogout;
