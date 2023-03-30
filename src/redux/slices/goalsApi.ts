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
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Goal } from "../../types";

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Goals"],
  endpoints: (builder) => ({
    fetchGoals: builder.query({
      async queryFn(user) {
        try {
          let goals: Array<DocumentData> = [];
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
            newGoal.id
          );
          await setDoc(docRef, newGoal, { merge: true });
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
            goal.id
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
            goal.id
          );
          await updateDoc(docRef, {
            "score.actual": increment(1),
          });
          const newActualScore = goal.score.actual + 1;
          if (newActualScore === goal.score.max) {
            await updateDoc(docRef, {
              isComplete: true,
            });
          }
          return { data: goal };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    editGoal: builder.mutation({
      async queryFn({ updatedGoalData, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            updatedGoalData.id
          );
          await updateDoc(docRef, {
            "score.max": parseInt(updatedGoalData.newMaxScore),
            title: updatedGoalData.newTitle,
          });
          return { data: updatedGoalData };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    deleteGoal: builder.mutation({
      async queryFn({ goal, currentUser }) {
        try {
          await deleteDoc(
            doc(db, `/users/${currentUser.userDocId}/user-goals/`, goal.id)
          );
          return { data: goal };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    resetGoal: builder.mutation({
      async queryFn({ goal, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goal.id
          );
          await updateDoc(docRef, {
            "score.actual": 0,
            isComplete: false,
          });
          return { data: goal };
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
  useEditGoalMutation,
  useDecrementGoalScoreMutation,
  useIncrementGoalScoreMutation,
  useDeleteGoalMutation,
  useResetGoalMutation,
} = firestoreApi;
