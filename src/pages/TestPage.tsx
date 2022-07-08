import { useState } from 'react';
import styled from 'styled-components';
import Modals from '../components/common/modal/Modals';
import MyModal from '../components/common/modal/MyModal';
import useModals from '../components/common/modal/useModals';

function TestPage() {
  // const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModals();

  function handleClick() {
    // setIsOpen(true);
    openModal(MyModal, { foo: 'bar' });
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
