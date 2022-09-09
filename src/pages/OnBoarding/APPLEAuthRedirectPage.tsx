import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@store/slices/authSlice';
import stringToBooleanOrNull from '@lib/utils/stringToBooleanOrNull';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import loadEXPOToken from '@lib/utils/loadEXPOToken';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';

function APPLEAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const accessToken = params.get('accessToken');
  const isKid = JSON.parse(params.get('isKid')!);
  const level = JSON.parse(params.get('level')!);
  const provider = params.get('provider');
  const canSetCredentials = accessToken && isKid && level && provider;
  const dispatch = useAppDispatch();
  const [EXPOToken, setEXPOToken] = useState<string>('');
  const navigate = useNavigate();

  console.log('accessToken: ', accessToken);
  console.log('isKid: ', isKid);
  console.log('level: ', level);
  console.log('isKid === null', isKid === null);
  console.log('level === null', level === null);
  console.log('provider: ', provider);

  useEffect(() => {
    async function proceedLogin() {
      canSetCredentials &&
        dispatch(setCredentials({ accessToken, isKid, level, provider }));
      setLocalStorage('accessToken', accessToken);
      setLocalStorage('isKid', isKid);
      setLocalStorage('provider', provider);

      setTimeout(() => {
        navigate('/');
      }, 5000); // webView 환경 아닌 경우 EXPO Token 등록 생략
      loadEXPOToken(setEXPOToken);
      // navigate('/');
      // setTimeout(() => {
      //   navigate('/');
      // }, 5000); // webView 환경 아닌 경우 EXPO Token 등록 생략
    }
    proceedLogin();
  }, []);

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function registerEXPOToken() {
      alert(
        `EXPO Token의 변화를 감지했습니다. 토큰값은 다음과 같습니다. ${EXPOToken}`,
      );
      try {
        const response = await axiosPrivate.patch('/user/expo', {
          expoToken: EXPOToken,
        });
        alert(`/user/expo response: ${JSON.stringify(response)}`);
        navigate('/');
      } catch (error: any) {
        alert(`error: ${JSON.stringify(error)}`);
      }
    }
    EXPOToken !== '' && registerEXPOToken();
  }, [EXPOToken]);

  return <CustomSyncLoader />;
}

export default APPLEAuthRedirectPage;

// https://tlog.tammolo.com/posts/apple-login-02
// https://developer111.tistory.com/57?category=948844
// https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams
