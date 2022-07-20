import { useModalsDispatch } from '../components/common/modal/ModalsContext';

// OPEN, CLOSE action 대한 dispatch 함수 사용 추상화
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
