const messageToRNWebView = (string: string) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(string);
  } else {
    alert(
      `현재 웹뷰 환경이 아닙니다. 그룹링크를 브라우저 개발자 도구의 Console에 출력합니다.`,
    );
    console.log(string);
  }
};

export default messageToRNWebView;
