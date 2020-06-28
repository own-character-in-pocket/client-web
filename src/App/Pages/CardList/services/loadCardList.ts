import { ok, Result } from "utils/functionals";

export type Card = {
  id: string;
  displayName: string;
  thumbnail: string;
};

type Item = Card[];

export const loadCardList = async (): Promise<Result<Item, any>> => {
  const cardList = createCardList();
  return ok(cardList);
};

const createCardList = (): Card[] => Array.from({ length: 3 }, createCard);

const createCard = (_: any, index: number): Card => ({
  id: index.toString(),
  displayName: `character${index}`,
  thumbnail: "empty.svg"
});
