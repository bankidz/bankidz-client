import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
// import { selectUser, setCredentials } from '../../store/slices/authSlice';
import { axiosPublic } from '../../lib/api/axios';

function useRefreshToken() {
  // const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const refresh = async () => {
    const response = await axiosPublic.post('/refreshes/', {}, {});
    const fetchedEmail: string = response?.data?.detail?.email;
    const fetchedAccessToken: string =
      response?.data?.detail?.token.access_token;
    // dispatch(
    // setCredentials({ email: fetchedEmail, accessToken: fetchedAccessToken }),
    // );
    return fetchedAccessToken;
  };
  return refresh;
}

export default useRefreshToken;
