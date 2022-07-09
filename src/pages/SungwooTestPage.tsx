import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../components/common/modal/useModals';
import Summary from '../components/homekid/Summary';
import ProfileButton from '../components/onboarding/ProfileButton';

// push test
function SungwooTestPage() {
  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.myModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
    });
  }

  return (
    <Wrapper>
      {/* <ProfileButton role="아빠" isSelected={false} /> */}
      {/* <Summary current={1000} goal={5000} month={6} week={4} /> */}
      <button onClick={handleClick}>모달 열기</button>
      {/* @ts-expect-error */}
      <Modals />
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div``;
