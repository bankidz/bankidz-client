import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../components/common/modal/useModals';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/components/navigation/navigation.min.css';

function SungwooTestPage() {
  // const { openModal } = useModals();
  SwiperCore.use([Navigation, Scrollbar]);
  const settings = {
    spaceBetween: 20, // px 단위 간격
    navigation: {
      // 좌우 버튼 커스텀
      // prevEl: // 이전 버튼 Ref 또는 className
      // nextEl: // 다음 버튼 Ref 또는 className
    },
    scrollbar: {
      // 스크롤바 커스텀
      draggable: true, // 드래그 가능 여부
      el: null, // 스크롤바 Ref 또는 className
    },
    slidesPerView: 3, // 한 화면에 보이는 슬라이드 수
    // onBeforeInit: // 이벤트 핸들러
  };
  return (
    <Wrapper>
      {/* <button onClick={handleClick}>모달 열기</button>
      <Modals /> */}
      <Swiper {...settings}>
        <SwiperSlide>
          <Card>카드1</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>카드2</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>카드3</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>카드4</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>카드5</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>카드6</Card>
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div`
  .swiper {
    &-wrapper,
    &-container {
      width: 62rem;
      margin: 0;
    }
    &-container {
      margin: 0 3.2rem;
    }
    &-button-disabled {
      // 더 이상 슬라이드를 넘길 수 없는 경우에 버튼을 숨기기 위함
      visibility: hidden;
    }
  }
`;

const Card = styled.div`
  height: 200px;
  width: 100px;
  border-radius: 10px;
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
