import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@store/slices/authSlice';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import registerEXPOToken from '@lib/utils/registerEXPOToken';

function APPLEAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const accessToken = params.get('accessToken');
  const isKid = JSON.parse(params.get('isKid')!);
  const level = JSON.parse(params.get('level')!);
  const provider = params.get('provider');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function proceedLogin() {
      dispatch(setCredentials({ accessToken, isKid, level, provider }));
      setLocalStorage('accessToken', accessToken);
      setLocalStorage('isKid', isKid);
      setLocalStorage('provider', provider);
      registerEXPOToken();
      navigate('/');
    }
    proceedLogin();
  }, []);

  return <CustomSyncLoader />;
}

export default APPLEAuthRedirectPage;

// https://tlog.tammolo.com/posts/apple-login-02
// https://developer111.tistory.com/57?category=948844
// https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams
