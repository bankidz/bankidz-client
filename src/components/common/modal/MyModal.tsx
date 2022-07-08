import ReactModal from 'react-modal';

// @ts-expect-error
function MyModal({ onSubmit, onClose }) {
  const handleSubmit = () => {
    onSubmit();
  };
  const handleCancel = () => {
    onClose();
  };
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
