import { useAppDispatch } from '../../../store/app/hooks';
import { axiosPublic } from '../../api/axios';
import { setCredentials } from '@store/slices/authSlice';

function useRefreshAccessToken() {
  const dispatch = useAppDispatch();

  const refreshAccessToken = async () => {
    const response = await axiosPublic.patch('/user/refresh');
    const { accessToken, isKid, level } = response.data.data;
    dispatch(setCredentials({ accessToken, isKid, level }));
    return accessToken;
  };
  return refreshAccessToken;
}

export default useRefreshAccessToken;
