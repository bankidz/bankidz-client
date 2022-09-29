import { useAppDispatch } from '@store/app/hooks';
import { setCredentials } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomSyncLoader from '@components/common/loadingSpinners/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import registerEXPOToken from '@lib/utils/registerEXPOToken';
import { ILoginDTO } from '@lib/apis/kakao/kakaoDTO';
import kakaoAPI from '@lib/apis/kakao/kakaoAPI';
import { useMutation } from 'react-query';

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
      dispatch(setCredentials({ accessToken, isKid, level, provider })); // TODO: exclude aT
      registerEXPOToken();
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

// const axiosPrivate = useAxiosPrivate();
// useEffect(() => {
//   async function registerEXPOToken() {
//     // alert(
//     //   `EXPOToken의 변화를 감지했습니다. 변화된 토큰값은 다음과 같습니다. ${EXPOToken}`,
//     // );
//     try {
//       const response = await axiosPrivate.patch('/user/expo', {
//         expoToken: EXPOToken,
//       });
//       // alert(`/user/expo response: ${JSON.stringify(response)}`);
//       navigate('/');
//     } catch (error: any) {
//       alert(`error: ${JSON.stringify(error)}`);
//     }
//   }
//   EXPOToken !== '' && registerEXPOToken();
// }, [EXPOToken]);
