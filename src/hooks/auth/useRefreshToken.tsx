import { useAppDispatch } from '../../store/app/hooks';
import { axiosPublic } from '../../lib/api/axios';
import { setCredentials } from '@store/slices/authSlice';

function useRefreshToken() {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const response = await axiosPublic.patch('/user/refresh');
    const { accessToken, isKid } = response.data;
    dispatch(setCredentials({ accessToken, isKid }));
    return accessToken;
  };

  return refresh;
}

export default useRefreshToken;
