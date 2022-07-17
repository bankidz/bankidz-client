import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../hooks/useModals';
import 'swiper/swiper.min.css';

function SungwooTestPage() {
  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.quaternaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
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

const Wrapper = styled.div``;

// https://joyful-development.tistory.com/35
// https://velog.io/@sohee-k/React-TypeScript-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Swiper-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0image-slider-library
