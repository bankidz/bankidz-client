import useAxiosPrivate from './auth/useAxiosPrivate';

function useRegisterFCMToken() {
  const axiosPrivate = useAxiosPrivate();

  let FCMToken = 'web';
  const eventListener = (event: any) => {
    FCMToken = event.data;
    alert(FCMToken);
  };

  const registerFCMToken = async () => {
    if (window.ReactNativeWebView) {
      document.addEventListener('message', eventListener); // AOS
      window.addEventListener('message', eventListener); // iOS
    }

    try {
      // TODO: response, console.log 삭제
      alert(FCMToken);
      const response = axiosPrivate.patch('/user/expo', {
        expoToken: FCMToken,
      });
      console.log('response: ', response);
    } catch (error: any) {
      console.error(error);
    }
  };
  return registerFCMToken;
}

export default useRegisterFCMToken;
