import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshAccessToken from '@lib/hooks/auth/useRefreshAccessToken';
import { useAppSelector } from '@store/app/hooks';
import { selectAccessToken } from '@store/slices/authSlice';
import useLocalStorage from '@lib/hooks/auth/useLocalStorage';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refreshAccessToken = useRefreshAccessToken();
  const accessToken = useAppSelector(selectAccessToken);
  const [persist] = useLocalStorage('persist', true);

  // @ts-expect-error
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refreshAccessToken();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false); // escape memory leak
      }
    };

    // verify only on refresh
    if (!accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => (isMounted = false);
  }, []);

  if (persist && isLoading) {
    // TODO: <p> 삭제
    return <p>자동 로그인 처리중입니다...</p>;
  } else {
    return <Outlet />;
  }
}

export default PersistLogin;

// TODO: 테스트 후 주석 삭제
// !accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
// return (
//   <>
//     {!persist ? (
//       <Outlet />
//     ) : isLoading ? (
//       <p>자동 로그인 처리중입니다...</p>
//     ) : (
//       <Outlet />
//     )}
//   </>
// );
