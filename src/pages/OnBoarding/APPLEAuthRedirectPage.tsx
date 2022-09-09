import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@store/slices/authSlice';
import stringToBooleanOrNull from '@lib/utils/stringToBooleanOrNull';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import loadEXPOToken from '@lib/hooks/auth/useRegisterEXPOToken';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';

function APPLEAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const accessToken = params.get('accessToken');
  const isKid = JSON.parse(params.get('isKid')!);
  const level = JSON.parse(params.get('level')!);
  const provider = params.get('provider');
  const canSetCredentials = accessToken && isKid && level && provider;
  const [EXPOToken, setEXPOToken] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function proceedLogin() {
      canSetCredentials &&
        dispatch(setCredentials({ accessToken, isKid, level, provider }));
      setLocalStorage('accessToken', accessToken);
      setLocalStorage('isKid', isKid);
      setLocalStorage('provider', provider);
      // loadEXPOToken(setEXPOToken);
      navigate('/');
    }
    proceedLogin();
  }, []);

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function registerEXPOToken() {
      alert(
        `EXPOToken의 변화를 감지했습니다. 변화된 토큰값은 다음과 같습니다. ${EXPOToken}`,
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
