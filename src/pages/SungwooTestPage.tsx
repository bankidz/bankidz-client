import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import 'swiper/swiper.min.css';
import useModals from '@hooks/useModals';
import MarginTemplate from '@components/layout/MarginTemplate';
import Receipt from '@components/common/Receipt';
import LevelBadge from '@components/common/badges/LevelBadge';

function SungwooTestPage() {
  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.primaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      badgeText: '돈길완주 성공',
      headerText: '에어팟 사기',
      bodyText: '10주간의 여정이 끝났어요.\n이제 돈을 찾아 구매하러 가보세요.',
    });
  }
  return (
    <Wrapper>
      <LevelBadge level={1} />
      <LevelBadge level={2} />
      <LevelBadge level={3} />
      <LevelBadge level={4} />
      <LevelBadge level={5} />
      <button onClick={handleClick}>모달 열기</button>
      <Modals />
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div``;

// https://joyful-development.tistory.com/35
// https://velog.io/@sohee-k/React-TypeScript-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Swiper-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0image-slider-library
