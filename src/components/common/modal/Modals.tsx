import React, { useContext } from 'react';
import { ModalsStateContext } from './ModalsContext';

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    // @ts-expect-error
    return <Component key={index} {...props} />;
  });
};

export default Modals;
