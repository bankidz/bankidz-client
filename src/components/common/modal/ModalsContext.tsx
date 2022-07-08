import { createContext, useMemo, useState } from 'react';

export const ModalsDispatchContext = createContext({
  open: () => {},
  close: () => {},
});

export const ModalsStateContext = createContext([]);

const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [openedModals, setOpenedModals] = useState([]);
  console.log(openedModals);

  // Component: 열고 싶은 모달 컴포넌트, props: 넘겨주고 싶은 props
  // @ts-expect-error
  const open = (Component, props) => {
    // @ts-expect-error
    setOpenedModals((modals) => {
      return [...modals, { Component, props }];
    });
  };

  // @ts-expect-error
  const close = (Component) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => {
        // @ts-expect-error
        return modal.Component !== Component;
      });
    });
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      {/* @ts-expect-error */}
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
