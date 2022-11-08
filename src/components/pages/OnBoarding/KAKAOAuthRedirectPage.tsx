import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useAppDispatch } from '@store/app/hooks';
import { setCredentials } from '@store/slices/authSlice';
import CustomSyncLoader from '@components/atoms/loaders/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import registerEXPOToken from '@lib/utils/registerEXPOToken';
import { ILoginDTO } from '@lib/apis/kakao/kakaoDTO';
import kakaoAPI from '@lib/apis/kakao/kakaoAPI';

function KAKAOAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const code = params.get('code');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const KAKAOLoginMutation = useMutation(kakaoAPI.kakaoLogin, {
    onSuccess: (data: ILoginDTO) => {
      const { accessToken, isKid, level, provider } = data;
      setLocalStorage('accessToken', accessToken);
      dispatch(setCredentials({ isKid, level, provider }));
      // registerEXPOToken();
      navigate('/');
    },
  });

  useEffect(() => {
    code && KAKAOLoginMutation.mutate({ code });
  }, []);

  return <CustomSyncLoader />;
}

export default KAKAOAuthRedirectPage;

// https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
