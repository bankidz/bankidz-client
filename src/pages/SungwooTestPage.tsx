import styled from 'styled-components';
import useModals from '@lib/hooks/useModals';
import Modals, { modals } from '@components/common/modals/Modals';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import InterestBadge from '@components/common/badges/InterestBadge';
import MarginTemplate from '@components/layout/MarginTemplate';
import Receipt from '@components/common/receipt/Receipt';
import SkeletonCircle from '@components/skeletons/SkeletonCircle';
import SkeletonRectangle from '@components/skeletons/SkeletonRectangle';

function SungwooTestPage() {
  const { openModal } = useModals();
  function openContract() {
    openModal(modals.tertiaryModal, {
      // variant: 'contract',
      onSubmit: () => {
        console.log('handle submit');
      },
      createdAt: '2022/08/03 04:06:04',
      interestRate: 20,
      isMom: false,
      itemName: '선물',
      title: '할머니 생신선물',
      totalPrice: 10000,
      weekPrice: 2000,
      weeks: 4,
    });
  }
  function openProposed() {
    openModal(modals.receiptModal, {
      variant: 'proposed',
      onSubmit: () => {
        console.log('handle submit');
      },
      onExtraSubmit: () => {
        console.log('handle extra submit');
      },
      createdAt: '2022/08/03 04:06:04',
      interestRate: 20,
      isMom: false,
      itemName: '선물',
      title: '할머니 생신선물',
      totalPrice: 10000,
      weekPrice: 2000,
      weeks: 4,
    });
  }
  function openProposing() {
    openModal(modals.receiptModal, {
      variant: 'proposing',
      onSubmit: () => {
        console.log('handle submit');
      },
      createdAt: '2022/08/03 04:06:04',
      interestRate: 20,
      isMom: false,
      itemName: '선물',
      title: '할머니 생신선물',
      totalPrice: 10000,
      weekPrice: 2000,
      weeks: 4,
    });
  }
  function openRejected() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.receiptModal, {
      variant: 'rejected',
      onSubmit: () => {
        console.log('handle submit');
      },
      createdAt: '2022/08/03 04:06:04',
      interestRate: 20,
      isMom: false,
      itemName: '선물',
      title: '할머니 생신선물',
      totalPrice: 10000,
      weekPrice: 2000,
      weeks: 4,
      comment: '큰 이자를 줄만한 목표가 아닌것 같다~',
    });
  }

  return (
    <Wrapper>
      <MarginTemplate>
        <RectangleWrapper>
          <SkeletonRectangle borderRadius={10} />
        </RectangleWrapper>
        <CircleWrapper>
          <SkeletonCircle radius={100} />
        </CircleWrapper>
        {/* <Shimmer /> */}
      </MarginTemplate>
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div`
  height: 1000px;
  background: pink;
`;

const RectangleWrapper = styled.div`
  width: 100%;
  height: 50px;
`;

const CircleWrapper = styled.div`
  background: cyan;
  width: 200px;
  height: 200px;
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
// async function handleFetchWalkingDongils() {
//   const response = await axiosPrivate.get('/challenge/?status=accept');
//   console.log('response in fetch walking roads: ', response);
//   console.log('response.data in fetch walking roads: ', response.data);
// }

// <button onClick={handleRefresh}>refresh test</button>
//       <button onClick={handleRequestWithAT}>request with aT test</button>
//       <button onClick={handlePrint}>print auth</button>
//       <button onClick={handleFetchWalkingDongils}>
//         Fetch Walking Money Roads
//       </button>

{
  /* <Wrapper>
        <button onClick={openContract}>contract</button>
        <button onClick={openProposed}>proposed</button>
        <button onClick={openProposing}>proposing</button>
        <button onClick={openRejected}>rejected</button>
        <Modals />
      </Wrapper> */
}
