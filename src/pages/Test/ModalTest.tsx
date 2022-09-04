import styled from 'styled-components';
import useModals from '@lib/hooks/useModals';
import Modals, { modals } from '@components/common/modals/Modals';

function ModalTest() {
  const { openModal } = useModals();

  function openTertiary() {
    openModal(modals.tertiaryModal, {
      onSubmit: () => {
        console.log('handle submit');
      },
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
      <Modals />
      {/* <button onClick={openContract}>contract</button> */}
      <button onClick={openProposed}>proposed</button>
      <button onClick={openProposing}>proposing</button>
      <button onClick={openRejected}>rejected</button>
    </Wrapper>
  );
}

export default ModalTest;

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
