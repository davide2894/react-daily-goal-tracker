import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  } as UserState,
  reducers: {
    login: (state, action) => {
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
