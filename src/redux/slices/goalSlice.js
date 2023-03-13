import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [
    {
      title: "my first goal",
      score: {
        max: 5,
        min: 0,
        actual: 0,
      },
      isComplete: false,
      id: "first",
    },
    {
      title: "my second goal",
      score: {
        max: 3,
        min: 0,
        actual: 1,
      },
      isComplete: false,
      id: "second",
    },
  ],
};

export const goalSlice = createSlice({
  name: "goalsSlice",
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    incrementScore: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );

      if (goalToUpdate) {
        goalToUpdate.score.actual += 1;
      }
    },
    decrementScore: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );

      if (goalToUpdate) {
        goalToUpdate.score.actual -= 1;
      }
    },
  },
});

export const { addGoal, incrementScore, decrementScore } = goalSlice.actions;
export default goalSlice.reducer;
