import styled from 'styled-components';
import Modals, { modals } from '../components/common/modal/Modals';
import useModals from '../components/common/modal/useModals';

function SungwooTestPage() {
  const { openModal } = useModals();
  // function handleClick() {
  //   // modals.myModal: 열고자 하는 모달
  //   // {...}: submit 시 처리되는 비즈니스 로직
  //   openModal(modals.primaryModal, {
  //     onSubmit: () => {
  //       console.log('비즈니스 로직 처리...');
  //     },
  //     headerContent: '가족이 생겼어요',
  //     bodyContent: '기획에서 워딩 생각해주세요',
  //   });
  // }
  // function handleClick() {
  //   // modals.myModal: 열고자 하는 모달
  //   // {...}: submit 시 처리되는 비즈니스 로직
  //   openModal(modals.secondaryModal, {
  //     onSubmit: () => {
  //       console.log('비즈니스 로직 처리...');
  //     },
  //     badgeContent: '돈길완주 성공',
  //     headerContent: '에어팟 사기',
  //     bodyContent:
  //       '10주 간의 여정이 끝났어요.\n이제 돈을 찾아 구매하러 가보세요.',
  //   });
  // }
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.tertiaryModal, {
      headerContent: '에어팟 사기',
      bodyContent: '은행에서 돈을 맡기면\n맡긴 돈의 일정 부분을 주는 것',
    });
  }
  return (
    <Wrapper>
      <button onClick={handleClick}>모달 열기</button>
      {/* @ts-expect-error */}
      <Modals />
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div``;
