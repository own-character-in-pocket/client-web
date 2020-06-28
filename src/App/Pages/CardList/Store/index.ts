import { combineReducers, createStore } from "utils/store";
import { CardActions as Card } from "./Card";

const reducers = { Card };

const reducer = combineReducers(reducers);

export const {
  StoreProvider: CardListStoreProvider,
  useStore: useCardListStore,
  useSelector: useCardListSelector,
  useDispatch: useCardListDispatch
} = createStore(reducer);
