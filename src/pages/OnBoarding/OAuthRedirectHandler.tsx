import { axiosPublic } from '@lib/api/axios';
import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type TRequestStatus = 'idle' | 'pending';

function OAuthRedirectHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginRequestStatus, setLoginRequestStatus] =
    useState<TRequestStatus>('idle');

  const href = window.location.href;
  // @ts-expect-error
  let params = new URL(document.location).searchParams;
  let code = params.get('code');

  // useEffect(() => {
  function handleClick() {
    try {
      setLoginRequestStatus('pending');
      console.log({ code });
      dispatch(login({ code })).unwrap();
      console.log('로그인에 성공했습니다.');
      // navigate('/home');
    } catch (err) {
      console.error('로그인에 실패했습니다.', err);
    } finally {
      setLoginRequestStatus('idle');
    }
  }
  // }, []);

  return (
    <>
      <div>OAuthRedirectHandler</div>
      <div>로그인 처리중입니다...</div>
      <button onClick={handleClick}>서버로 코드 전송</button>
    </>
  );
}

export default OAuthRedirectHandler;
