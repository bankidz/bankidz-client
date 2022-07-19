import { useEffect } from 'react';
import { axiosPublic } from '@lib/api/axios';
import { useAppDispatch } from '@store/app/hooks';
import { setCredentials } from '@store/slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuthRedirectHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const href = window.location.href;
  // @ts-expect-error
  let params = new URL(document.location).searchParams;
  let code = params.get('code');

  // POST: 뱅키즈 서버로 인가코드 전송
  useEffect(() => {
    async function login() {
      try {
        const response = await axiosPublic.post('/kakao/login', { code });
        console.log('response: ');
        console.log(response);
        const { accessToken, isKid } = response.data.data;
        dispatch(setCredentials({ accessToken, isKid }));
        // navigate('/register/1');
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
    login();
  }, []);

  return (
    <>
      <div>로그인 처리중입니다...</div>
    </>
  );
}

export default OAuthRedirectHandler;

// https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
