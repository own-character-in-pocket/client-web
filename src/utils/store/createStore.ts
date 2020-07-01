import { createContext, createElement, DependencyList, Dispatch, ReactNode, Reducer, useContext, useMemo, useReducer } from "react";
import { Action, ActionList } from "./combineReducers";

const throwError = () => {
  throw new Error("StoreProvider를 감싸지 않았습니다.");
};

const initialState = new Proxy({}, { get: throwError });
const initialDispatcher = throwError;

const createInitialContext = <S, A extends Action | ActionList>(): readonly [S, Dispatch<A>] => [initialState as S, initialDispatcher];

export const createStore = <S, A extends Action | ActionList>(reducer: Reducer<S, A>) => {
  const Context = createContext(createInitialContext<S, A>());

  type Selector<SS> = (store: S) => SS;

  const useStore = <SS>(selector: Selector<SS>, dependencies?: DependencyList): readonly [SS, Dispatch<A>] => {
    const [store, dispatch] = useContext(Context);
    const createMemo = () => [selector(store), dispatch] as const;

    return useMemo(createMemo, dependencies);
  };

  const useDispatch = () => useContext(Context)[1];

  const useSelector = <SS>(selector: Selector<SS>, dependencies?: DependencyList) => {
    const [store] = useContext(Context);
    const createMemo = () => selector(store);

    return useMemo(createMemo, dependencies);
  };

  type Props = Readonly<{ children: ReactNode; createInitialStore?: (args?: any) => S; args: any }>;
  const StoreProvider = ({ children, createInitialStore = args => args, args }: Props) => {
    const initializer = () => createInitialStore(args);
    const context = useReducer(reducer, null, initializer);

    return createElement(Context.Provider, { value: context }, children);
  };

  return { useStore, useDispatch, useSelector, StoreProvider };
};
