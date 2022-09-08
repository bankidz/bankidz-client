function getEXPOToken() {
  let EXPOToken = 'notWebView';
  const listener = (event: any) => {
    alert('listener called');
    alert(`0 EXPOToken: ${EXPOToken}`);
    EXPOToken = JSON.stringify(event.data);
    alert(`1 EXPOToken: ${EXPOToken}`);
  };

  if (window.ReactNativeWebView) {
    alert('window.ReactNativeWebView'); // 2
    document.addEventListener('message', listener); // AOS
    window.addEventListener('message', listener); // iOS
  }

  alert(`2 EXPOToken: ${EXPOToken}`);
  return EXPOToken;
}

export default getEXPOToken;
