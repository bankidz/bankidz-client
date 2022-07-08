import React, { useContext } from 'react';
import { useModalsDispatch, useModalsState } from './ModalsContext';
import MyModal from './MyModal';

// 구현하는 서비스에서 사용하는 모달 컴포넌트를 이름에 매핑 시켜주면 된다.
// 서비스 내에 사용되는 모든 모달을 Modals 컴포넌트에서 정의해두면
// 매번 사용하는 컴포넌트에서 import 해서 사용하지 않고 이름만으로도 바로 사용할 수 있게 된다.
// 필요한 컴포넌트만 그때그때 로딩할 수 있도록 다이나믹 import 기법을 사용해서 처리해준다.
export const modals = {
  myModal: MyModal,
  // TODO: code splitting
  // myModal: loadable(() => import('./MyModal')),
};

const Modals = () => {
  // const openedModals = useContext(ModalsStateContext);
  const { openedModals } = useModalsState();
  const dispatch = useModalsDispatch();
  // const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    // props에서 onSubmit을 제외한 나머지를 restProps로 재정의 하고
    // Component에 스프레드로 넘겨주는 props를 restProps로 변경합니다.
    const { onSubmit, ...restProps } = props;
    const onClose = () => {
      // close(Component);
      dispatch({
        type: 'CLOSE',
        Component,
      });
    };

    // 비즈니스 로직 처리
    // 비즈니스 로직은 모달을 열어주는 쪽에서 모달의 props로 넘겨줄 수 있도록 처리한다.
    // ModalsState에 저장된 props 안의 onSubmit을 호출하도록 처리한다.
    // 모든 모달에서 onSubmit을 필요로 하지 않기 때문에 props에 onSubmit을 넘겨준 경우에만
    // 처리하도록 함수인지 확인을 해준 후 호출한다.
    const handleSubmit = async () => {
      if (typeof onSubmit === 'function') {
        // onSubmit 동작이 비동기일지 동기일지 모르기 때문에 async/await를 사용해서
        // onSubmit 동작이 끝난후에 닫히도록 처리합니다.
        // @ts-expect-error
        await onSubmit();
      }
      onClose();
    };
    return (
      // @ts-expect-error
      <Component
        {...restProps}
        key={index}
        {...props}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    );
  });
};

export default Modals;
