import useAxiosPrivate from './auth/useAxiosPrivate';

function useRegisterEXPOToken() {
  const axiosPrivate = useAxiosPrivate();

  async function registerEXPOToken() {
    const listener = (event: any) => {
      const EXPOToken = JSON.stringify(event.data);
      alert(EXPOToken);
      axiosPrivate.patch('/user/expo', {
        expoToken: EXPOToken,
      });
    };

    if (window.ReactNativeWebView) {
      document.addEventListener('message', listener); // AOS
      window.addEventListener('message', listener); // iOS
    } else {
      axiosPrivate.patch('/user/expo', {
        expoToken: 'web',
      });
    }
  }

  return registerEXPOToken;
}

export default useRegisterEXPOToken;
