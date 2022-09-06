import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import useRegisterEXPOToken from '@lib/hooks/useRegisterEXPOToken';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import { useEffect } from 'react';

function KAKAOAuthRedirectPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerEXPOToken = useRegisterEXPOToken();

  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const code = params.get('code');

  useEffect(() => {
    async function proceedLogin() {
      try {
        console.log(code);
        code && (await dispatch(login({ code })).unwrap());
        await registerEXPOToken();
        navigate('/test');
      } catch (error: any) {
        console.error(error);
      }
    }
    proceedLogin();
  }, []);

  return <CustomSyncLoader />;
}

export default KAKAOAuthRedirectPage;

// https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

// TODO: 테스트 후 주석 삭제
// const RNListener = () => {
//   const listener = (event: any) => {
//     alert(event.data);
//     alert(typeof event.data);
//   };

//   if (window.ReactNativeWebView) {
//     document.addEventListener('message', listener); // AOS
//     window.addEventListener('message', listener); // iOS
//   }
// };

// useEffect(() => {
//   RNListener();
// }, []);
