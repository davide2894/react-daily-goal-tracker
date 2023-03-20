import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

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
    updateGoal: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );
      if (goalToUpdate) {
        goalToUpdate.title = action.payload.title;
        goalToUpdate.score.max = action.payload.score;
      }
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
    deleteGoal: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );
      if (goalToUpdate) {
        state.goals = state.goals.filter((el) => el.id !== goalToUpdate.id);
      }
    },
  },
});

export const {
  addGoal,
  updateGoal,
  deleteGoal,
  incrementScore,
  decrementScore,
} = goalSlice.actions;
export default goalSlice.reducer;
