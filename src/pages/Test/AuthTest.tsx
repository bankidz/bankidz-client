import styled from 'styled-components';
import useRefreshAccessToken from '@lib/hooks/auth/useRefreshAccessToken';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppSelector } from '@store/app/hooks';
import { selectAuth } from '@store/slices/authSlice';
import { axiosPublic } from '@lib/api/axios';

function AuthTest() {
  const refreshAccessToken = useRefreshAccessToken();
  const axiosPrivate = useAxiosPrivate();

  async function handleHealth() {
    const response = axiosPublic.get('/health');
    alert(JSON.stringify(response));
    console.log(response);
  }

  async function handleRefresh() {
    const newAccessToken = await refreshAccessToken();
    alert(`newAccessToken in handleRefresh: ${JSON.stringify(newAccessToken)}`);
    console.log('newAccessToken in handleRefresh: ', newAccessToken);
  }

  async function handleRequestWithAT() {
    const response = await axiosPrivate.get('/user');
    alert(`response.data in handle: ${JSON.stringify(response)}`);
    console.log('response.data in handleRequest: ', response); // response.status 401 인지 확인
    console.log('response.data in handleRequest: ', response.status); // response.status 401 인지 확인
  }

  const auth = useAppSelector(selectAuth);
  function handlePrint() {
    alert(`auth: ${JSON.stringify(auth)}`);
    console.log('=======================');
    console.log(auth);
    console.log('=======================');
  }

  return (
    <Wrapper>
      <button onClick={handleHealth}>health</button>
      <button onClick={handleRefresh}>refresh test</button>
      <button onClick={handleRequestWithAT}>request with aT test</button>
      <button onClick={handlePrint}>print auth</button>
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
