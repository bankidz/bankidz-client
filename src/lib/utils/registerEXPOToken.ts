import { axiosPrivate } from '@lib/apis/axios';
import { toast } from 'react-toastify';

function registerEXPOToken() {
  let isRegistered = false;
  const listener = async (event: any) => {
    const EXPOToken = event.data;
    if (isRegistered === false) {
      try {
        const response = await axiosPrivate.patch('/user/expo', {
          expoToken: EXPOToken,
        });
        // alert(`response: ${JSON.stringify(response)}`);
        isRegistered = true;
      } catch (error: any) {
        // alert(`error: ${JSON.stringify(error)}`);
        toast.error('기기 식별정보 전송에 실패했습니다.');
      }
    }
  };

  if (window.ReactNativeWebView) {
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }
}

export default registerEXPOToken;

// alert(
//   `RN 통신을 감지했습니다. 전송받은 값은 다음과 같습니다. ${JSON.stringify(
//     event.data,
//   )}`,
// );
// alert(`/user/expo response: ${JSON.stringify(response)}`);
