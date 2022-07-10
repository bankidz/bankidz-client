import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../components/common/modal/useModals';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/components/navigation/navigation.min.css';
import { useState } from 'react';

// showcase
function SungwooTestPage() {
  // const { openModal } = useModals();
  const [swiper, setSwiper] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  console.log(mainImageIndex);

  SwiperCore.use([Navigation]);

  const swiperParams = {
    navigation: true,
    onSwiper: setSwiper,
    onSlideChange: (e: any) => setMainImageIndex(e.activeIndex),
    slidesPerView: 1.1,
    // spaceBetween: 20,
  };

  return (
    <Wrapper>
      {/* <button onClick={handleClick}>모달 열기</button>
      <Modals /> */}
      {/* @ts-expect-error */}
      <StyledSwiper {...swiperParams} ref={setSwiper}>
        <SwiperSlide>
          <Card>카드1</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>카드2</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>카드3</Card>
        </SwiperSlide>
      </StyledSwiper>
    </Wrapper>
  );
}

// https://joyful-development.tistory.com/35
// https://velog.io/@sohee-k/React-TypeScript-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Swiper-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0image-slider-library

export default SungwooTestPage;

const Wrapper = styled.div`
  background: lightgray;
  .swiper {
    &-button-disabled {
      visibility: hidden;
    }
  }
`;

const StyledSwiper = styled(Swiper)`
  position: relative;
  background: lightgray;
  width: 300px;
  height: 760px;
`;

const Card = styled.div`
  /* padding-left: 20px; */
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 15px;
  width: 250px;
  height: 500px;
  border-radius: 30px;
  background: pink;
`;

// function handleClick() {
//   // modals.myModal: 열고자 하는 모달
//   // {...}: submit 시 처리되는 비즈니스 로직
//   openModal(modals.primaryModal, {
//     onSubmit: () => {
//       console.log('비즈니스 로직 처리...');
//     },
//     headerContent: '가족이 생겼어요',
//     bodyContent: '기획에서 워딩 생각해주세요',
//   });
// }
// function handleClick() {
//   // modals.myModal: 열고자 하는 모달
//   // {...}: submit 시 처리되는 비즈니스 로직
//   openModal(modals.secondaryModal, {
//     onSubmit: () => {
//       console.log('비즈니스 로직 처리...');
//     },
//     badgeContent: '돈길완주 성공',
//     headerContent: '에어팟 사기',
//     bodyContent:
//       '10주 간의 여정이 끝났어요.\n이제 돈을 찾아 구매하러 가보세요.',
//   });
// }
// function handleClick() {
//   // modals.myModal: 열고자 하는 모달
//   // {...}: submit 시 처리되는 비즈니스 로직
//   openModal(modals.tertiaryModal, {
//     headerContent: '에어팟 사기',
//     bodyContent: '은행에서 돈을 맡기면\n맡긴 돈의 일정 부분을 주는 것',
//   });
// }
