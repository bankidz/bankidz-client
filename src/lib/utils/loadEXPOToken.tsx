import { Dispatch, SetStateAction } from 'react';

function loadEXPOToken(setEXPOToken: Dispatch<SetStateAction<string>>) {
  const listener = (event: any) => {
    // alert(
    //   `RN 통신을 감지했습니다. 전송받은 값은 다음과 같습니다. ${JSON.stringify(
    //     event.data,
    //   )}`,
    // );
    setEXPOToken(event.data);
  };

  if (window.ReactNativeWebView) {
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }
}

export default loadEXPOToken;
