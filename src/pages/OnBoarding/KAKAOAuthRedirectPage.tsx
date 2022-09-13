import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import registerEXPOToken from '@lib/utils/registerEXPOToken';

function KAKAOAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const code = params.get('code');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function proceedLogin() {
      try {
        if (code) {
          const response = await dispatch(login({ code })).unwrap();
        }
        registerEXPOToken();
        navigate('/');
      } catch (error: any) {
        console.error(error);
      }
    }
    code && proceedLogin();
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
