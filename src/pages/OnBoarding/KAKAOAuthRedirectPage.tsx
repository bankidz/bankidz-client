import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import getEXPOToken from '@lib/utils/get/getEXPOToken';

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

    function proceedGetEXPOToken() {
      const EXPOToken = getEXPOToken();
      alert(`3 EXPOToken: ${EXPOToken}`);
    }
    proceedGetEXPOToken();

    //
    // let EXPOToken = 'notWebView';
    //   const listener = (event: any) => {
    //     alert('listener called');
    //     // alert(`0 EXPOToken: ${EXPOToken}`);
    //     // EXPOToken = JSON.stringify(event.data);
    //     // alert(`1 EXPOToken: ${EXPOToken}`);
    //   };

    //   if (window.ReactNativeWebView) {
    //     alert('window.ReactNativeWebView'); // 2
    //     document.addEventListener('message', listener); // AOS
    //     window.addEventListener('message', listener); // iOS
    //   }
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
