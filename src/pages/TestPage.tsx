import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../components/common/modal/useModals';

function TestPage() {
  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.primaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
    });
  }
  return (
    <>
      <button onClick={handleClick}>모달 열기</button>
      {/* @ts-expect-error */}
      <Modals />
    </>
  );
}

export default TestPage;
