import { useContext } from 'react';
import { useModalsDispatch } from './ModalsContext';

export default function useModals() {
  // const { open, close } = useContext(ModalsDispatchContext);
  const dispatch = useModalsDispatch();

  // @ts-expect-error
  const openModal = (Component, props) => {
    // open(Component, props);
    dispatch({
      type: 'OPEN',
      Component,
      props,
    });
  };

  // @ts-expect-error
  const closeModal = (Component) => {
    // close(Component);
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
