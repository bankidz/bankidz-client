import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import loadEXPOToken from '@lib/utils/loadEXPOToken';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';

function KAKAOAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const code = params.get('code');
  const dispatch = useAppDispatch();
  const [EXPOToken, setEXPOToken] = useState<string>('');
  useEffect(() => {
    async function proceedLogin() {
      try {
        if (code) {
          const response = await dispatch(login({ code })).unwrap();
          setLocalStorage('auth', response.data);
        }
        loadEXPOToken(setEXPOToken);
      } catch (error: any) {
        console.error(error);
      }
    }
    code && proceedLogin();
  }, []);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    async function registerEXPOToken() {
      alert(`EXPOToken의 변화를 감지했습니다. 토큰값은 ${EXPOToken} 입니다.`);
      try {
        const response = await axiosPrivate.post('/user/expo', {
          expoToken: EXPOToken,
        });
        console.log(response);
        // navigate('/');
      } catch (error: any) {
        console.error(error);
      }
    }
    EXPOToken !== '' && registerEXPOToken();
  }, [EXPOToken]);

  return <CustomSyncLoader />;
}

export default KAKAOAuthRedirectPage;

// https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
