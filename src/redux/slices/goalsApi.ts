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
    isComplete: goalObjectFromFirestore.isComplete,
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
          let goals: Array<Goal> = [];
          const querySnapshot = await getDocs(
            collection(db, `/users/${user.userDocId}/user-goals/`)
          );
          querySnapshot.forEach((doc) => {
            goals.push(mapGoal(doc.data()));
          });
          return { data: goals };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Goals"],
    }),
    addGoal: builder.mutation({
      async queryFn({ goal, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goal.id
          );
          await setDoc(docRef, goal, { merge: true });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    decrementGoalScore: builder.mutation({
      async queryFn({ goalId, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goalId
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
      async queryFn({ goalId, max, actual, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goalId
          );
          await updateDoc(docRef, {
            "score.actual": increment(1),
          });
          const newActualScore = actual + 1;
          if (newActualScore === max) {
            await updateDoc(docRef, {
              isComplete: true,
            });
          }
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    editGoal: builder.mutation({
      async queryFn({ goal, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goal.id
          );
          await updateDoc(docRef, {
            "score.max": parseInt(goal.score.max),
            title: goal.title,
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    deleteGoal: builder.mutation({
      async queryFn({ goalId, currentUser }) {
        try {
          await deleteDoc(
            doc(db, `/users/${currentUser.userDocId}/user-goals/`, goalId)
          );
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Goals"],
    }),
    resetGoal: builder.mutation({
      async queryFn({ goalId, currentUser }) {
        try {
          const docRef = doc(
            db,
            `/users/${currentUser.userDocId}/user-goals/`,
            goalId
          );
          await updateDoc(docRef, {
            "score.actual": 0,
            isComplete: false,
          });
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
  useEditGoalMutation,
  useDecrementGoalScoreMutation,
  useIncrementGoalScoreMutation,
  useDeleteGoalMutation,
  useResetGoalMutation,
} = firestoreApi;
