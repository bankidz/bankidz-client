import ReactModal from 'react-modal';

interface MyModalProps {
  isOpen: boolean;
}

function MyModal({ isOpen }: MyModalProps) {
  return (
    <ReactModal isOpen={isOpen}>
      <div>모달 입니다.</div>
    </ReactModal>
  );
}

export default MyModal;
