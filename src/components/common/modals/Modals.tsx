import { useModalsDispatch, useModalsState } from './ModalsContext';
import PrimaryModal from './primaryModal/PrimaryModal';
import SecondaryModal from './secondaryModal/SecondaryModal';
import TertiaryModal from './tertiaryModal/TertiaryModal';
import QuaternaryModal from './QuaternaryModal/QuaternaryModal';
import ReceiptModal from './receiptModal/ReceiptModal';

// TODO: code splitting
export const modals = {
  primaryModal: PrimaryModal,
  secondaryModal: SecondaryModal,
  tertiaryModal: TertiaryModal,
  quaternaryModal: QuaternaryModal,
  receiptModal: ReceiptModal,
};

// 전역 상태 (배열)의 각 요소의 props를 Component와 매핑 & submit / cancel 시 로직을 추가하여 랜더링
const Modals = () => {
  const { openedModals } = useModalsState();
  const dispatch = useModalsDispatch();

  return (
    <>
      {openedModals.map((modal, i) => {
        const { Component, props } = modal;
        // obSubmit을 제외한 나머지를 restProps로 재정의한다.
        const { onSubmit, onExtraSubmit, ...restProps } = props;

        const handleCancel = () => {
          dispatch({
            type: 'CLOSE',
            Component,
          });
        };

        const handleSubmit = async () => {
          // 모든 모달에서 obSubmit을 필요로 하지 않기 때문에 props와 onSubmit을
          // 넘겨준 경우에만 처리하도록 함수인지 확인 후 호출한다.
          if (typeof onSubmit === 'function') {
            // onSubmit 동작이 비동기일지 동기일지 모르기 때문에
            // async/await를 사용하여 obSubmit 동작이 끝난 후에 닫히도록 처리한다.
            await onSubmit();
          }
          handleCancel(); // 비즈니스 로직이 진행된 뒤 닫힌다.
        };

        // 부모 파트를 위해 QuaternaryModal 수정 작업중 추가된 코드
        const handleExtraSubmit = async () => {
          if (typeof onExtraSubmit === 'function') {
            await onExtraSubmit();
          }
          handleCancel();
        };

        return (
          // @ts-expect-error
          <Component
            key={i}
            {...props}
            {...restProps}
            onSubmit={handleSubmit}
            onExtraSubmit={handleExtraSubmit}
            onClose={handleCancel}
          />
        );
      })}
    </>
  );
};

export default Modals;
