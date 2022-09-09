import { Dispatch, SetStateAction } from 'react';

/**
 * 앱과 통신을 통해 EXPOToken을 가져옵니다.
 */
function loadEXPOToken(setEXPOToken: Dispatch<SetStateAction<string>>) {
  // let EXPOToken = 'invalidToken';
  const listener = (event: any) => {
    alert('listener called'); // 4 // 7
    // alert(`0 EXPOToken: ${EXPOToken}`); // 5 not webview // 8 token
    setEXPOToken(JSON.stringify(event.data));
    // alert(`1 EXPOToken: ${EXPOToken}`); // 6 token // 9 token
  };

  if (window.ReactNativeWebView) {
    alert('window.ReactNativeWebView'); // 1
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }

  // alert(`2 EXPOToken: ${EXPOToken}`); // 2 not webview
  // return EXPOToken;
}

export default loadEXPOToken;
