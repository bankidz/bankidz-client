import useAxiosPrivate from './auth/useAxiosPrivate';

function useRegisterEXPOToken() {
  const axiosPrivate = useAxiosPrivate();

  async function registerEXPOToken() {
    const listener = async (event: any) => {
      alert('listener called!');
      const EXPOToken = JSON.stringify(event.data);
      alert(EXPOToken);
      const response = await axiosPrivate.patch('/user/expo', {
        expoToken: EXPOToken,
      });
      console.log(response);
    };

    if (window.ReactNativeWebView) {
      alert('window.ReactNativeWebView');
      document.addEventListener('message', listener); // AOS
      window.addEventListener('message', listener); // iOS
    } else {
      alert('notWebview');
      const response = await axiosPrivate.patch('/user/expo', {
        expoToken: 'notWebview',
      });
      console.log(response);
    }
  }

  return registerEXPOToken;
}

export default useRegisterEXPOToken;
