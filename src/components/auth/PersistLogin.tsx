import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@store/app/hooks';
import { setCredentials } from '@store/slices/authSlice';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';

function PersistLogin() {
  const auth = getLocalStorage('auth');
  const dispatch = useAppDispatch();
  if (auth) {
    dispatch(
      setCredentials({
        accessToken: auth.accessToken,
        isKid: auth.isKid,
        level: auth.level,
        provider: auth.provider,
      }),
    );
  }

  return <Outlet />;
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
//     console.log('verify only on refresh');
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
