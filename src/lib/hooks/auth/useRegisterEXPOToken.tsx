import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

function useRegisterEXPOToken() {
  const [EXPOToken, setEXPOToken] = useState<string>('');
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function patchEXPOToken() {
      alert(
        `EXPOToken의 변화를 감지했습니다. 변화된 토큰값은 다음과 같습니다. ${EXPOToken}`,
      );
      try {
        const response = await axiosPrivate.patch('/user/expo', {
          expoToken: EXPOToken,
        });
        alert(`/user/expo response: ${JSON.stringify(response)}`);
      } catch (error: any) {
        alert(`error: ${JSON.stringify(error)}`);
      }
    }
    EXPOToken !== '' && patchEXPOToken();
  }, [EXPOToken]);

  function registerEXPOToken() {
    const listener = (event: any) => {
      alert(
        `RN 통신을 감지했습니다. 전송받은 값은 다음과 같습니다. ${JSON.stringify(
          event.data,
        )}`,
      );
      setEXPOToken(event.data);
    };

    if (window.ReactNativeWebView) {
      document.addEventListener('message', listener); // AOS
      window.addEventListener('message', listener); // iOS
    }
  }
  return registerEXPOToken;
}

export default useRegisterEXPOToken;

// async function useRegisterEXPOToken(
//   setEXPOToken: Dispatch<SetStateAction<string>>,
// ) {
//   function registerEXPOToken() {
//     const listener = (event: any) => {
//       alert(
//         `RN 통신을 감지했습니다. 전송받은 값은 다음과 같습니다. ${JSON.stringify(
//           event.data,
//         )}`,
//       );
//       setEXPOToken(event.data);
//     };

//     if (window.ReactNativeWebView) {
//       document.addEventListener('message', listener); // AOS
//       window.addEventListener('message', listener); // iOS
//     }
//   }
//   return registerEXPOToken;
// }

// export default useRegisterEXPOToken;
