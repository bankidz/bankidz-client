import { useModalsDispatch } from '../../components/shared/modals/ModalsContext';

/**
 * OPEN, CLOSE action 대한 dispatch 함수 사용 추상화
 *
 * 컴포넌트 내부 사용 예시
 * function ExampleComponent() {
 *   const { openModal } = useModals();
 *   function handleClick() {
 *     // modals.myModal: 열고자 하는 모달
 *     openModal(modals.myModal, {
 *       onSubmit: () => {
 *         console.log('submit (제출 버튼 클릭) 시 처리되는 비즈니스 로직...');
 *       },
 *     });
 *   }
 *   return (
 *     <Wrapper>
 *       <button onClick={handleClick}>모달 열기</button>
 *       <Modals />
 *     </Wrapper>
 *   );
 * }
 */
function useModals() {
  const dispatch = useModalsDispatch();

  // @ts-expect-error
  const openModal = (Component, props) => {
    dispatch({
      type: 'OPEN',
      Component,
      props,
    });
  };

  // @ts-expect-error
  const closeModal = (Component) => {
    dispatch({
      type: 'CLOSE',
      Component,
    });
  };

  return {
    openModal,
    closeModal,
  };
}

export default useModals;
