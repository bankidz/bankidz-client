import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@store/slices/authSlice';
import stringToBooleanOrNull from '@lib/utils/stringToBooleanOrNull';
import CustomSyncLoader from '@components/common/CustomSyncLoader';

function APPLEAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const accessToken = params.get('accessToken');
  const isKid = JSON.parse(params.get('isKid')!);
  const level = JSON.parse(params.get('level')!);
  const provider = params.get('provider');
  const canSetCredentials = accessToken && isKid && level && provider;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log('accessToken: ', accessToken);
  console.log('isKid: ', isKid);
  console.log('level: ', level);
  console.log('isKid === null', isKid === null);
  console.log('level === null', level === null);
  console.log('provider: ', provider);

  useEffect(() => {
    async function proceedLogin() {
      try {
        canSetCredentials &&
          dispatch(setCredentials({ accessToken, isKid, level, provider }));
        // navigate('/');
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
