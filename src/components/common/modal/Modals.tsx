import React, { useContext } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from './ModalsContext';

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    // props에서 onSubmit을 제외한 나머지를 restProps로 재정의 하고
    // Component에 스프레드로 넘겨주는 props를 restProps로 변경합니다.
    // @ts-expect-error
    const { onSubmit, ...restProps } = props;
    const onClose = () => {
      // @ts-expect-error
      close(Component);
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
        // @ts-expect-error
        {...props}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    );
  });
};

export default Modals;
