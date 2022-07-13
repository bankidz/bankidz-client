import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../components/common/modal/useModals';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

function SungwooTestPage() {
  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.tertiaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      headerContent: '이자율이란?',
      bodyContent:
        '전체 맡긴 돈 중에 이자가\n얼마나 차지하는 지를 나타내는 말\n\n예를 들어 20%의 이자율을 주는\n은행이라면 내가 100만원을 저금했을 때\n20만원의 이자를 받을 수 있어요',
    });
  }
  return (
    <Wrapper>
      <button onClick={handleClick}>모달 열기</button>
      {/* @ts-expect-error */}
      <Modals />
    </Wrapper>
  );
}

// https://joyful-development.tistory.com/35
// https://velog.io/@sohee-k/React-TypeScript-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Swiper-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0image-slider-library

export default SungwooTestPage;

const Wrapper = styled.div``;

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
