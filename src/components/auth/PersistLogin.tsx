import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { setCredentials } from '@store/slices/authSlice';
import registerEXPOToken from '@lib/utils/registerEXPOToken';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';
import { useMutation } from 'react-query';
import userAPI from '@lib/apis/user/userAPI';
import CustomRotatingLines from '@components/common/loaders/CustomRotatingLines';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';

function PersistLogin() {
  const accessToken = getLocalStorage('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const persistLoginMutation = useMutation(userAPI.patchUserRefresh, {
    onSuccess: (data) => {
      const { accessToken, isKid, level, provider } = data;
      setLocalStorage('accessToken', accessToken);
      dispatch(setCredentials({ isKid, level, provider }));
      registerEXPOToken();
      setIsLoading(false);
    },
  });

  useEffect(() => {
    accessToken && persistLoginMutation.mutate();
  }, []);

  if (accessToken && isLoading) {
    return <CustomRotatingLines />;
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

// let isMounted = true;
// async function proceedPersistLogin() {
//   try {
//     const response = await dispatch(persistLogin()).unwrap();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isMounted && setIsLoading(false); // escape memory leak
//   }
// }
// accessToken && proceedPersistLogin();
// registerEXPOToken();
// return () => (isMounted = false);
