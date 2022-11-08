import setLocalStorage from './localStorage/setLocalStorage';
import getLocalStorage from './localStorage/getLocalStorage';
import { axiosPrivate } from '@lib/apis/axios';

function RNListener() {
  const listener = async (event: any) => {
    const newEXPOToken = event.data;
    alert(`newEXPOToken: ${JSON.stringify(newEXPOToken)}`);
    const oldEXPOToken = getLocalStorage('EXPOToken');
    alert(`oldEXPOToken: ${JSON.stringify(oldEXPOToken)}`);

    try {
      const response = await axiosPrivate.patch('/user/expo', {
        expoToken: newEXPOToken,
      });
      alert(`response: ${JSON.stringify(response)}`);

      setLocalStorage('EXPOToken', newEXPOToken);
    } catch (error: any) {
      alert(`error: ${JSON.stringify(error)}`);
    }
  };

  if (window.ReactNativeWebView) {
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }
}

export default RNListener;
