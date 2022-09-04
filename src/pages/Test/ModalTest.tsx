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
  function openContract() {
    openModal(modals.receiptModal, {
      variant: 'contract',
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
      comment: {
        content: '큰 이자를 줄만한 목표가 아닌것 같다~',
        id: '3',
      },
    });
  }

  return (
    <>
      <Modals />
      <button onClick={openContract}>ReceiptModal variant: contract</button>
      <button onClick={openProposed}>ReceiptModal variant: proposed</button>
      <button onClick={openProposing}>ReceiptModal variant: proposing</button>
      <button onClick={openRejected}>ReceiptModal variant: rejected</button>
    </>
  );
}

export default ModalTest;
