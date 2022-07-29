import styled from 'styled-components';
import useModals from '@lib/hooks/useModals';
import MarginTemplate from '@components/layout/MarginTemplate';
import { useAppSelector } from '@store/app/hooks';
import useRefreshToken from '@lib/hooks/auth/useRefreshToken';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { selectAuth } from '@store/slices/authSlice';
import Modals, { modals } from '@components/common/modals/Modals';

function SungwooTestPage() {
  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.quaternaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      onExtraSubmit: () => {
        console.log('handle accept button click');
      },
      isKid: false,
    });
  }

  return (
    <Wrapper>
      <button onClick={handleClick}>모달 열기</button>
      <Modals />
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  button + button {
    margin-top: 10px;
  } */
  /* background: grey; */
`;

// https://joyful-development.tistory.com/35
// https://velog.io/@sohee-k/React-TypeScript-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Swiper-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0image-slider-library

// // JWT test code
// const refresh = useRefreshToken();
// async function handleRefresh() {
//   const newAccessToken = await refresh();
//   console.log('newAccessToken in handleRefresh: ', newAccessToken);
// }
// const axiosPrivate = useAxiosPrivate();
// async function handleRequestWithAT() {
//   const response = await axiosPrivate.get('/user');
//   console.log('response.data in handleRequest: ', response); // response.status 401 인지 확인
//   console.log('response.data in handleRequest: ', response.status); // response.status 401 인지 확인
// }
// const auth = useAppSelector(selectAuth);
// function handlePrint() {
//   console.log('=======================');
//   console.log(auth);
//   console.log('=======================');
// }
// async function handleFetchWalkingMoneyRoads() {
//   const response = await axiosPrivate.get('/challenge/?status=accept');
//   console.log('response in fetch walking roads: ', response);
//   console.log('response.data in fetch walking roads: ', response.data);
// }

// <button onClick={handleRefresh}>refresh test</button>
//       <button onClick={handleRequestWithAT}>request with aT test</button>
//       <button onClick={handlePrint}>print auth</button>
//       <button onClick={handleFetchWalkingMoneyRoads}>
//         Fetch Walking Money Roads
//       </button>
