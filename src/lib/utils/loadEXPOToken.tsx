import { Dispatch, SetStateAction } from 'react';

function loadEXPOToken(setEXPOToken: Dispatch<SetStateAction<string>>) {
  const listener = (event: any) => {
    setEXPOToken(event.data);
  };

  if (window.ReactNativeWebView) {
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }
}

export default loadEXPOToken;
