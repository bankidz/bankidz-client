import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';

function KAKAOAuthRedirectPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const code = params.get('code');

  useEffect(() => {
    async function proceedLogin() {
      try {
        if (code) {
          const response = await dispatch(login({ code })).unwrap();
          setLocalStorage('auth', response.data);
        }
        navigate('/');
      } catch (error: any) {
        console.error(error);
      }
    }
    proceedLogin();

    // async function registerEXPOToken() {
    //   const EXPOToken = getEXPOToken();
    //   alert(`EXPOToken in registerEXPOToken: ${EXPOToken}`);
    // }
    // registerEXPOToken();
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
