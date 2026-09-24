import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

type UserState = {
  user: User | null;
};

const storedUser = localStorage.getItem("userInfo");

const initialState: UserState = {
  user: storedUser ? JSON.parse(storedUser) as User : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
