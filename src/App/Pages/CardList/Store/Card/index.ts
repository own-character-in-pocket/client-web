import { createDuck } from "utils/store";
import { Card } from "../../services/loadCardList";

const createInitialState = () => ({
  itemList: [] as Card[]
});

export const CardActions = createDuck({
  namespace: "Card",
  createInitialState,
  reducers: {
    set(state, cardList: Card[]) {
      state.itemList = cardList;
    }
  }
});
