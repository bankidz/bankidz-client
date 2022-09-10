import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';

function AuthTest() {
  const [EXPOToken, setEXPOToken] = useState<string>('');
  useEffect(() => {
    // function proceedGetEXPOToken() {
    // loadEXPOToken(setEXPOToken);
    // alert(`3 EXPOToken: ${EXPOToken}`); // 3 not webview
    // }
    // proceedGetEXPOToken();
    // loadEXPOToken(setEXPOToken);
  }, []);

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function registerEXPOToken() {
      alert(`EXPOToken의 변화를 감지했습니다. 토큰값은 ${EXPOToken} 입니다.`);
      try {
        const response = await axiosPrivate.post('/user/expo', {
          expoToken: EXPOToken,
        });
        console.log(response);
      } catch (error: any) {
        console.error(error);
      }
    }
    EXPOToken !== '' && registerEXPOToken();
  }, [EXPOToken]);

  return (
    <Wrapper>
      <span>1147</span>
      <span>{`EXPOToken: ${EXPOToken}`}</span>
    </Wrapper>
  );
}

export default AuthTest;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  button + button {
    margin-top: 30px;
  }

  button {
    border: 2px solid red;
  }
`;

{
  /* <button onClick={handleRefresh}>refresh test</button>
<button onClick={handleRequestWithAT}>request with aT test</button>
<button onClick={handlePrint}>print auth</button> */
}

// async function handleRefresh() {
//   const newAccessToken = await refreshAccessToken();
//   alert(`newAccessToken in handleRefresh: ${JSON.stringify(newAccessToken)}`);
//   console.log('newAccessToken in handleRefresh: ', newAccessToken);
// }

// async function handleRequestWithAT() {
//   const response = await axiosPrivate.get('/user');
//   alert(`response.data in handle: ${JSON.stringify(response)}`);
//   console.log('response.data in handleRequest: ', response); // response.status 401 인지 확인
//   console.log('response.data in handleRequest: ', response.status); // response.status 401 인지 확인
// }

// const auth = useAppSelector(selectAuth);
// function handlePrint() {
//   alert(`auth: ${JSON.stringify(auth)}`);
//   console.log('=======================');
//   console.log(auth);
//   console.log('=======================');
// }
