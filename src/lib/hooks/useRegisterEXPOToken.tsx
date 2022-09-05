import useAxiosPrivate from './auth/useAxiosPrivate';

function useRegisterEXPOToken() {
  const axiosPrivate = useAxiosPrivate();

  async function registerEXPOToken() {
    const listener = (event: any) => {
      let EXPOToken = 'web';
      EXPOToken = JSON.stringify(event.data);
      alert(EXPOToken);
      axiosPrivate.patch('/user/expo', {
        expoToken: EXPOToken,
      });
    };

    if (window.ReactNativeWebView) {
      document.addEventListener('message', listener); // AOS
      window.addEventListener('message', listener); // iOS
    }
  }

  return registerEXPOToken;
}

export default useRegisterEXPOToken;
