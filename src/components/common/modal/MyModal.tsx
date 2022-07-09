import ReactModal from 'react-modal';

// 모달 내부에 표시될 UI 작성
// @ts-expect-error
function MyModal({ onSubmit, onClose }) {
  function handleSubmit() {
    onSubmit();
  }
  function handleCancel() {
    onClose();
  }
  return (
    <ReactModal isOpen>
      <div>모달 입니다.</div>
      <div>
        <button onClick={handleSubmit}>확인</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </ReactModal>
  );
}

export default MyModal;
