import { ok, Result } from "utils/functionals";

export type Card = {
  id: string;
  displayName: string;
  thumbnail: string;
};

type Item = null | Card;

export const loadCard = async (id: string): Promise<Result<Item, any>> => {
  const card = createCard(id);
  return ok(card);
};

const createCard = (id: string): Card => ({
  id,
  displayName: `character${id}`,
  thumbnail: "empty.svg"
});
