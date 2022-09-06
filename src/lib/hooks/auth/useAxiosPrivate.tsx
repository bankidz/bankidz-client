import { useEffect } from 'react';
import { useAppSelector } from '@store/app/hooks';
import useRefreshAccessToken from '@lib/hooks/auth/useRefreshAccessToken';
import { selectAccessToken } from '@store/slices/authSlice';
import { axiosPrivateInstance } from '@lib/api/axios';

function useAxiosPrivate() {
  const refreshAccessToken = useRefreshAccessToken();
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
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          // aT expired (401) -> refresh aT -> request prevRequest
          console.log('aT expired (401) -> refresh aT -> request prevRequest');
          prevRequest.sent = true;
          const newAccessToken = await refreshAccessToken();
          prevRequest.headers['X-AUTH-TOKEN'] = `${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        }
        return Promise.reject(error); // rT expired (again 401) -> navigate to loginPage
      },
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refreshAccessToken]);

  return axiosPrivateInstance; // interceptors applied
}

export default useAxiosPrivate;

// https://axios-http.com/kr/docs/interceptors
