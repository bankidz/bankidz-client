import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuthRedirectHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const href = window.location.href;
  // @ts-expect-error
  let params = new URL(document.location).searchParams;
  let code = params.get('code');

  useEffect(() => {
    async function processLogin() {
      try {
        await dispatch(login({ code })).unwrap();
        navigate('/register/1');
      } catch (error: any) {
        console.error(error.message);
      }
    }
    processLogin();
  }, []);

  return (
    <>
      <div>로그인 처리중입니다...</div>
    </>
  );
}

export default OAuthRedirectHandler;

// https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// try {
//   const response = await axiosPublic.post('/kakao/login', { code });
//   console.log('response: ');
//   console.log(response);
//   const { accessToken, isKid } = response.data.data;
//   dispatch(setCredentials({ accessToken, isKid }));
//   // navigate('/register/1');
//   navigate('/');
// } catch (error) {
//   console.error(error);
// }
