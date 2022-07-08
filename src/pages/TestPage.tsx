import { useState } from 'react';
import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import MyModal from '../components/common/modal/MyModal';
import useModals from '../components/common/modal/useModals';

function TestPage() {
  // const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModals();

  function handleClick() {
    // setIsOpen(true);
    openModal(modals.myModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
    });
  }
  return (
    <Wrapper>
      <button onClick={handleClick}>모달 열기</button>
      {/* <MyModal isOpen={isOpen} /> */}
      {/* @ts-expect-error */}
      <Modals />
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
