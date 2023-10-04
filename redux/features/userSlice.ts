import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_TYPE } from "types/user.type";

type UserState = {
  user: USER_TYPE | null;
};

const initialState = {
  user: null,
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    login: (state, action: PayloadAction<USER_TYPE>) => {
      state.user = action.payload;
    },
    update: (state, action: PayloadAction<Object>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      } as USER_TYPE;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, update, logout } = user.actions;
export default user.reducer;
