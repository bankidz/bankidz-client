import { useModalsDispatch } from './ModalsContext';

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
