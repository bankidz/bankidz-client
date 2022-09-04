import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@store/slices/authSlice';
import { string } from 'prop-types';
import stringToBooleanOrNull from '@lib/utils/stringToBooleanOrNull';
import useRegisterFCMToken from '@lib/hooks/useRegisterFCMToken';

function APPLEAuthRedirectPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerFCMToken = useRegisterFCMToken();

  useEffect(() => {
    console.log('apple callback redirected');
    console.log('login API');

    // @ts-expect-error
    const params = new URL(document.location).searchParams;
    const accessToken = params.get('aT');
    const isKid =
      params.get('isKid') && stringToBooleanOrNull(params.get('isKid')!);
    const level =
      params.get('level') && stringToBooleanOrNull(params.get('level')!);

    const error = params.get('error');
    if (!error) {
      console.log(error);
    }

    console.log('accessToken: ', accessToken);
    console.log('isKid: ', isKid);
    console.log('level: ', level);
    console.log('error: ', error);

    const canSetCredentials = accessToken && isKid && level;
    canSetCredentials &&
      dispatch(setCredentials({ accessToken, isKid, level }));

    // navigate('/');
  }, []);

  return <p>애플 로그인 처리중입니다...</p>;
}

export default APPLEAuthRedirectPage;

// https://tlog.tammolo.com/posts/apple-login-02
// https://developer111.tistory.com/57?category=948844
// https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams
