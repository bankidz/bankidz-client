import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '@hooks/auth/useRefreshToken';
import { useAppSelector } from '@store/app/hooks';
import { selectAccessToken } from '@store/slices/authSlice';
import useLocalStorage from '@hooks/auth/useLocalStorage';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const accessToken = useAppSelector(selectAccessToken);
  const [persist] = useLocalStorage('persist', true);

  // @ts-expect-error
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false); // escape memory leak
      }
    };
    // verify only on refresh
    !accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  console.log(persist);
  console.log('aT in PersistLogin: ', accessToken);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
}

export default PersistLogin;
