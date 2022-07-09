import React, {
  Component,
  createContext,
  Dispatch,
  HTMLAttributes,
  useContext,
  useReducer,
} from 'react';

export interface IModal {
  Component: Component;
  props: HTMLAttributes<HTMLElement>;
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

// {모달 컴포넌트, 해당 컴포넌트에 넘겨줄 props} 객체 배열을 전역 상태로 관리
function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case 'OPEN':
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
