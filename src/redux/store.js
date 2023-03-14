import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "./slices/goalSlice";
import goalFormReducer from "./slices/goalFormSlice";

export const store = configureStore({
  reducer: {
    goalReducer: goalReducer,
    goalFormReducer: goalFormReducer,
  },
});
