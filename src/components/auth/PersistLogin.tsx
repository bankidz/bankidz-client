import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import {
  selectAccessToken,
  selectIsKid,
  setLevel,
} from '@store/slices/authSlice';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import registerEXPOToken from '@lib/utils/registerEXPOToken';

function PersistLogin() {
  const accessToken = useAppSelector(selectAccessToken);
  const isKid = useAppSelector(selectIsKid);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const isRegisteredUser = accessToken && isKid;

  // @ts-expect-error
  useEffect(() => {
    let isMounted = true;
    async function fetchLevel() {
      try {
        const response = await axiosPrivate.get('/user');
        const { isKid } = response.data.data.user;
        if (isKid) {
          const { level } = response.data.data.kid;
          dispatch(setLevel(level)); // get latest level
        }
      } catch (error) {
        navigate('/auth/login'); // access token expired
      } finally {
        isMounted && setIsFetching(false); // escape memory leak
      }
    }
    console.log('aT in fetchLevel: ', accessToken);
    isRegisteredUser && fetchLevel();
    registerEXPOToken();
    return () => (isMounted = false);
  }, []);

  if (isRegisteredUser && isFetching) {
    return <CustomSyncLoader />;
  } else {
    return <Outlet />;
  }
}

export default PersistLogin;

// httpOnly secure cookie 사용 시 logic
// const [isLoading, setIsLoading] = useState(true);
// const refreshAccessToken = useRefreshAccessToken();
// const accessToken = useAppSelector(selectAccessToken);
// const [persist] = useLocalStorage('persist', true);

// // @ts-expect-error
// useEffect(() => {
//   let isMounted = true;
//   const verifyRefreshToken = async () => {
//     try {
//       await refreshAccessToken();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       isMounted && setIsLoading(false); // escape memory leak
//     }
//   };

//   // verify only on refresh
//   if (accessToken === '' && persist) {
//     verifyRefreshToken();
//   } else {
//     setIsLoading(false);
//   }

//   return () => (isMounted = false);
// }, []);

// if (persist && isLoading) {
//   return <p>자동 로그인 처리중입니다...</p>;
// } else {
//   return <Outlet />;
// }
