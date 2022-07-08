import { useContext } from 'react';
import { ModalsDispatchContext } from './ModalsContext';

export default function useModals() {
  const { open, close } = useContext(ModalsDispatchContext);

  // @ts-expect-error
  const openModal = (Component, props) => {
    // @ts-expect-error
    open(Component, props);
  };

  // @ts-expect-error
  const closeModal = (Component) => {
    // @ts-expect-error
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}
