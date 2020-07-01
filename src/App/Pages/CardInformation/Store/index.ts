import { Reducer } from "react";
import { combineReducers, createStore } from "utils/store";
import { CardActions as Card } from "./Card";

const reducers = { Card };

const reducer = combineReducers(reducers);

export type CardInformationPageStore = {
  [key in keyof typeof reducers]: typeof reducers[key] extends Reducer<infer S, any> ? S : never;
};

export const {
  StoreProvider: CardInformationStoreProvider,
  useStore: useCardInformationStore,
  useSelector: useCardInformationSelector,
  useDispatch: useCardInformationDispatch
} = createStore(reducer);
