import styled from 'styled-components';
import useRefreshAccessToken from '@lib/hooks/auth/useRefreshAccessToken';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppSelector } from '@store/app/hooks';
import { selectAuth } from '@store/slices/authSlice';

function AuthTest() {
  const refreshAccessToken = useRefreshAccessToken();
  async function handleRefresh() {
    const newAccessToken = await refreshAccessToken();
    console.log('newAccessToken in handleRefresh: ', newAccessToken);
  }
  const axiosPrivate = useAxiosPrivate();
  async function handleRequestWithAT() {
    const response = await axiosPrivate.get('/user');
    console.log('response.data in handleRequest: ', response); // response.status 401 인지 확인
    console.log('response.data in handleRequest: ', response.status); // response.status 401 인지 확인
  }
  const auth = useAppSelector(selectAuth);
  function handlePrint() {
    console.log('=======================');
    console.log(auth);
    console.log('=======================');
  }
  async function handleFetchWalkingDongils() {
    const response = await axiosPrivate.get('/challenge/?status=accept');
    console.log('response in fetch walking roads: ', response);
    console.log('response.data in fetch walking roads: ', response.data);
  }

  return (
    <Wrapper>
      <button onClick={handleRefresh}>refresh test</button>
      <button onClick={handleRequestWithAT}>request with aT test</button>
      <button onClick={handlePrint}>print auth</button>
      <button onClick={handleFetchWalkingDongils}>
        Fetch Walking Money Roads
      </button>
    </Wrapper>
  );
}

export default AuthTest;

const Wrapper = styled.div`
  height: 1000px;
  background: pink;
`;
