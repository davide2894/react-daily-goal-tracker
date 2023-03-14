import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  goalTitle: "",
  goalScore: "",
};

export const goalFormSlice = createSlice({
  name: "goalFormSlice",
  initialState,
  reducers: {
    showForm: (state) => {
      state.show = true;
    },
    hideForm: (state) => {
      state.show = false;
    },
    setGoalTitle: (state, payload) => {
      state.goalTitle = payload;
    },
    setGoalScore: (state, payload) => {
      state.goalTitle = payload;
    },
  },
});

export const { showForm, hideForm, setGoalTitle, setGoalScore } =
  goalFormSlice.actions;
export default goalFormSlice.reducer;
