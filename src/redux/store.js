import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "./slices/goalSlice";
import goalFormReducer from "./slices/goalFormSlice";
import { firebaseReducer, actionTypes } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export const store = configureStore({
  reducer: {
    goalReducer: goalReducer,
    goalFormReducer: goalFormReducer,
    firebaseReducer: firebaseReducer,
    firestoreReducer: firestoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR],
      },
    }),
});
