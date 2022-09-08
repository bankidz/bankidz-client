async function getEXPOToken() {
  let EXPOToken = 'notWebView';
  const listener = (event: any) => {
    alert('listener called'); // 4 // 7
    alert(`0 EXPOToken: ${EXPOToken}`); // 5 not webview // 8 token
    EXPOToken = JSON.stringify(event.data);
    alert(`1 EXPOToken: ${EXPOToken}`); // 6 token // 9 token
  };

  if (window.ReactNativeWebView) {
    alert('window.ReactNativeWebView'); // 1
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }

  alert(`2 EXPOToken: ${EXPOToken}`); // 2 not webview
  return EXPOToken;
}

export default getEXPOToken;
