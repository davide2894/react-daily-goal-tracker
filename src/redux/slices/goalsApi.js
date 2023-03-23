// src/features/scores/scoresSlice.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Goals"],
  endpoints: (build) => ({
    fetchGoals: build.query({
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
    addGoal: build.mutation({
      async queryFn({ newGoal, currentUser }) {
        try {
          await setDoc(
            doc(
              db,
              `/users/${currentUser.userDocId}/user-goals/`,
              newGoal.title
            ),
            newGoal,
            { merge: true }
          );
          console.log(newGoal);
          return { data: newGoal };
        } catch (err) {
          console.log({ error: err });
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const { useFetchGoalsQuery, useAddGoalMutation } = firestoreApi;
