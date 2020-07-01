import { createDuck } from "utils/store";
import { Card } from "../../services/loadCard";

type State = {
  item: Card;
};

const createInitialState = (): State => {
  throw new Error("Unreachable!");
};

export const CardActions = createDuck({
  namespace: "Card",
  createInitialState,
  reducers: {
    set(state, card: Card) {
      state.item = card;
    }
  }
});
