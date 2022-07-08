import { useModalsDispatch, useModalsState } from './ModalsContext';
import MyModal from './MyModal';

// TODO: code splitting
export const modals = {
  myModal: MyModal,
};

const Modals = () => {
  const { openedModals } = useModalsState();
  const dispatch = useModalsDispatch();

  return openedModals.map((modal, i) => {
    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;

    const handleCancel = () => {
      dispatch({
        type: 'CLOSE',
        Component,
      });
    };

    const handleSubmit = async () => {
      if (typeof onSubmit === 'function') {
        // @ts-expect-error
        await onSubmit();
      }
      handleCancel();
    };

    return (
      // @ts-expect-error
      <Component
        key={i}
        {...restProps}
        {...props}
        onSubmit={handleSubmit}
        onClose={handleCancel}
      />
    );
  });
};

export default Modals;
