import React, {
  Component,
  createContext,
  Dispatch,
  HTMLAttributes,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';

export interface IModal {
  Component: Component;
  props: HTMLAttributes<HTMLButtonElement>;
}

type TState = {
  openedModals: IModal[];
};

type TAction =
  | {
      type: 'OPEN';
      Component: Component;
      props: HTMLAttributes<HTMLButtonElement>;
    }
  | { type: 'CLOSE'; Component: Component };

type TDispatch = Dispatch<TAction>;

const ModalsStateContext = createContext<TState | undefined>(undefined);
const ModalsDispatchContext = createContext<TDispatch | undefined>(undefined);

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case 'OPEN':
      // return state.openedModals.concat({
      //   Component: action.Component,
      //   props: action.props
      // })
      return {
        ...state,
        openedModals: state.openedModals.concat({
          Component: action.Component,
          props: action.props,
        }),
      };
    case 'CLOSE':
      return {
        ...state,
        openedModals: state.openedModals.filter((modal) => {
          modal.Component !== action.Component;
        }),
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function ModalsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    openedModals: [],
  });
  return (
    <ModalsDispatchContext.Provider value={dispatch}>
      <ModalsStateContext.Provider value={state}>
        {children}
      </ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
}

export function useModalsState() {
  const state = useContext(ModalsStateContext);
  if (!state) throw new Error('Cannot find the Provider');
  return state;
}

export function useModalsDispatch() {
  const dispatch = useContext(ModalsDispatchContext);
  if (!dispatch) throw new Error('Cannot find the Provider');
  return dispatch;
}

// export const ModalsDispatchContext = createContext({
//   open: () => {},
//   close: () => {},
// });

// export const ModalsStateContext = createContext([]);

// const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
//   const [openedModals, setOpenedModals] = useState([]);
//   console.log(openedModals);

//   // Component: 열고 싶은 모달 컴포넌트, props: 넘겨주고 싶은 props
//   // @ts-expect-error
//   const open = (Component, props) => {
//     // @ts-expect-error
//     setOpenedModals((modals) => {
//       return [...modals, { Component, props }];
//     });
//   };

//   // @ts-expect-error
//   const close = (Component) => {
//     setOpenedModals((modals) => {
//       return modals.filter((modal) => {
//         // @ts-expect-error
//         return modal.Component !== Component;
//       });
//     });
//   };

//   const dispatch = useMemo(() => ({ open, close }), []);

//   return (
//     <ModalsStateContext.Provider value={openedModals}>
//       {/* @ts-expect-error */}
//       <ModalsDispatchContext.Provider value={dispatch}>
//         {children}
//       </ModalsDispatchContext.Provider>
//     </ModalsStateContext.Provider>
//   );
// };

// export default ModalsProvider;
