import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserData, User } from "../../types";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  } as User,
  reducers: {
    login: (state, action: PayloadAction<LoginUserData>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;
//   const posts = useSelector((state) => state.posts);

export default userSlice.reducer;
