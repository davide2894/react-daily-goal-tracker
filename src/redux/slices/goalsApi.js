// src/features/scores/scoresSlice.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Goals"],
  endpoints: (builder) => ({
    fetchGoals: builder.query({
      async queryFn(user) {
        try {
          let goals = [];
          const querySnapshot = await getDocs(
            collection(db, `/users/${user.userDocId}/user-goals/`)
          );
          querySnapshot.forEach((doc) => {
            goals.push(doc.data());
          });
          console.log({ data: goals });
          return { data: goals };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Goals"],
    }),
    addGoal: builder.mutation({
      async queryFn({ newGoal, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            newGoal.title
          );
          await setDoc(docRef, newGoal, { merge: true });
          console.log(newGoal);
          return { data: newGoal };
        } catch (err) {
          console.log({ error: err });
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    decrementGoalScore: builder.mutation({
      async queryFn({ goal, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goal.title
          );
          await updateDoc(docRef, {
            "score.actual": increment(-1),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    incrementGoalScore: builder.mutation({
      async queryFn({ goal, currentUser }) {
        try {
          console.log({ goal, currentUser });
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goal.title
          );
          await updateDoc(docRef, {
            "score.actual": increment(1),
          });
          // find goal document that matches goal id
          // update that goal score by 1
          // return goal
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const {
  useFetchGoalsQuery,
  useAddGoalMutation,
  useDecrementGoalScoreMutation,
  useIncrementGoalScoreMutation,
} = firestoreApi;
