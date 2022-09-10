import { axiosPrivateTemp } from '@apis/axios';

function registerEXPOToken() {
  let isRegistered = false;
  const listener = async (event: any) => {
    alert(
      `RN 통신을 감지했습니다. 전송받은 값은 다음과 같습니다. ${JSON.stringify(
        event.data,
      )}`,
    );

    const EXPOToken = event.data;
    if (isRegistered === false) {
      alert(`isRegister: ${JSON.stringify(isRegistered)}`);
      try {
        const response = await axiosPrivateTemp.patch('/user/expo', {
          expoToken: EXPOToken,
        });
        isRegistered = true;
        alert(`/user/expo response: ${JSON.stringify(response)}`);
      } catch (error: any) {
        alert(`error: ${JSON.stringify(error)}`);
      }
    }
  };

  if (window.ReactNativeWebView) {
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }
}

export default registerEXPOToken;
