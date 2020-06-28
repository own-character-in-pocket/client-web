import { Reducer } from "react";

type Reducers<S> = Readonly<{ [Key in keyof S]: Reducer<S[Key], any> }>;

export type Action = Readonly<{ type: symbol; payload: any }>;
export type ActionList = readonly [Action, ...(readonly Action[])];

export type AfterChange<S> = (previousStore: S, nextStore: S) => void | Promise<void>;

export const combineReducers = <S extends Record<string, any>, A>(reducers: Reducers<S>, afterChange: AfterChange<S> = () => {}) => {
  const reducer: Reducer<S, A> = (previousStore = {} as S, action) => {
    const actions = Array.isArray(action) ? ((action as unknown) as ActionList) : [(action as unknown) as Action];
    const nextStore = {} as S;
    let isChanged = false;
    for (const action of actions) {
      let isChangedLocal = false;
      for (const key in reducers) {
        const reducer = reducers[key];
        const previousState = nextStore[key] || previousStore[key];
        const nextState = reducer(previousState, action);
        nextStore[key] = nextState;
        if (!isChangedLocal) {
          isChangedLocal = previousState !== nextState;
        }
      }
      if (!isChanged) {
        isChanged = isChangedLocal;
      }
    }
    if (isChanged) {
      afterChange(previousStore, nextStore);
    }
    return isChanged ? nextStore : previousStore;
  };
  return reducer;
};
