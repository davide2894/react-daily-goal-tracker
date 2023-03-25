import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import goalFormReducer from "./slices/goalFormSlice";
import userReducer from "./slices/userSlice";
import { firestoreApi } from "./slices/goalsApi";

export const store = configureStore({
  reducer: {
    goalFormReducer: goalFormReducer,
    userReducer: userReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(firestoreApi.middleware);
  },
});
