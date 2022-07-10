import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../components/common/modal/useModals';

function SungwooTestPage() {
  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.primaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      mainLabel: '가족이 생겼어요',
      subLabel: '기획에서 워딩 생각해주세요',
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

export default SungwooTestPage;

const Wrapper = styled.div``;
