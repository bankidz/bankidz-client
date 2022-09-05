import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@store/slices/authSlice';
import stringToBooleanOrNull from '@lib/utils/stringToBooleanOrNull';
import useRegisterEXPOToken from '@lib/hooks/useRegisterEXPOToken';
import CustomSyncLoader from '@components/common/CustomSyncLoader';

function APPLEAuthRedirectPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerEXPOToken = useRegisterEXPOToken();

  useEffect(() => {
    // @ts-expect-error
    const params = new URL(document.location).searchParams;
    const accessToken = params.get('aT');
    const isKid =
      params.get('isKid') && stringToBooleanOrNull(params.get('isKid')!);
    const level =
      params.get('level') && stringToBooleanOrNull(params.get('level')!);
    const provider = params.get('provider');

    console.log('accessToken: ', accessToken);
    console.log('isKid: ', isKid);
    console.log('level: ', level);
    console.log('provider: ', provider);

    const canSetCredentials = accessToken && isKid && level && provider;
    canSetCredentials &&
      dispatch(setCredentials({ accessToken, isKid, level, provider }));

    async function proceedLogin() {
      try {
        await registerEXPOToken();
        navigate('/');
      } catch (error: any) {
        console.error(error);
      }
    }
    proceedLogin();
  }, []);

  return <CustomSyncLoader />;
}

export default APPLEAuthRedirectPage;

// https://tlog.tammolo.com/posts/apple-login-02
// https://developer111.tistory.com/57?category=948844
// https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams
