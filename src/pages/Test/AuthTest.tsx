import styled from 'styled-components';
import { useEffect } from 'react';
import getEXPOToken from '@lib/utils/get/getEXPOToken';

function AuthTest() {
  useEffect(() => {
    const EXPOToken = getEXPOToken();
    alert(`3 EXPOToken: ${EXPOToken}`);
  }, []);

  return (
    <Wrapper>
      <span>1234</span>
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
