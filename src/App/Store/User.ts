import { createDuck } from "utils/store";

export type Avatar = string;

type State = {
  avatar: null | Avatar;
};

const createInitialState = (): State => {
  throw new Error("Unreachable");
};

export const UserActions = createDuck({
  namespace: "User",
  createInitialState,
  reducers: {
    setAvatar(state, avatar: Avatar) {
      state.avatar = avatar;
    }
  }
});
