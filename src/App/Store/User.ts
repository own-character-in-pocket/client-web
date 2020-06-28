import { createDuck } from "utils/store";

export type Avatar = string;

const createInitialState = () => ({
  avatar: null as null | Avatar
});

export const UserActions = createDuck({
  namespace: "User",
  createInitialState,
  reducers: {
    setAvatar(state, avatar: Avatar) {
      state.avatar = avatar;
    }
  }
});
