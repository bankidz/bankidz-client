import { useEffect } from 'react';
import { useAppSelector } from '@store/app/hooks';
import useRefreshToken from '@hooks/auth/useRefreshToken';
import { selectAccessToken } from '@store/slices/authSlice';
import { axiosPrivateInstance } from '@lib/api/axios';

// https://axios-http.com/kr/docs/interceptors
function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        // @ts-expect-error
        if (!config.headers['X-AUTH-TOKEN']) {
          // @ts-expect-error
          config.headers['X-AUTH-TOKEN'] = `${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // TODO: status 401 확인
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          // access token expired (401) -> refresh access token -> request prevRequest
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['X-AUTH-TOKEN'] = `${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        }
        return Promise.reject(error); // refresh token expired (again 401) -> navigate to loginPage
      },
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivateInstance; // return instance including interceptors
}

export default useAxiosPrivate;
