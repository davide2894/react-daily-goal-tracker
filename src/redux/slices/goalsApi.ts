// src/features/scores/scoresSlice.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Goal } from "../../types";

const mapGoal = (goalObjectFromFirestore): Goal => {
  return {
    title: goalObjectFromFirestore.title,
    score: goalObjectFromFirestore.score,
    id: goalObjectFromFirestore.id,
  };
};

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Goals"],
  endpoints: (builder) => ({
    fetchGoals: builder.query({
      async queryFn(user) {
        try {
          console.log("goals api - fetching goals from DB");
          let goalsFromDB: Array<Goal> = [];
          const querySnapshot = await getDocs(
            collection(db, `/users/${user.userDocId}/user-goals/`)
          );
          querySnapshot.forEach((doc) => {
            goalsFromDB.push(mapGoal(doc.data()));
          });
          return { data: goalsFromDB };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Goals"],
    }),
  }),
});

export const {
  useFetchGoalsQuery,
  useAddGoalMutation,
  useEditGoalMutation,
  useDecrementGoalScoreMutation,
  useIncrementGoalScoreMutation,
  useDeleteGoalMutation,
  useResetGoalMutation,
} = firestoreApi;
