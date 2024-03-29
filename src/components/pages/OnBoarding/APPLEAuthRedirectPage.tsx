import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/app/hooks';
import { setCredentials } from '@store/slices/authSlice';
import CustomSyncLoader from '@components/atoms/loaders/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';

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
    const proceedLogin = () => {
      setLocalStorage('accessToken', accessToken);
      provider && dispatch(setCredentials({ isKid, level, provider }));
      navigate('/');
    };
    proceedLogin();
  }, []);

  return <CustomSyncLoader />;
}

export default APPLEAuthRedirectPage;

// https://tlog.tammolo.com/posts/apple-login-02
// https://developer111.tistory.com/57?category=948844
// https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams
