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
            updatedGoalData.originalTitle
          );
          await updateDoc(docRef, {
            "score.max": updatedGoalData.newMaxScore,
            title: updatedGoalData.newTitle,
            // problema:
            // quando aggiorno un obiettivo, se aggiorno il titolo, poi questo nuovo titolo
            // viene usato come discriminante nell'increment, per cercare il goal
            // questo perché i goal hanno come id il goal title
            // todo:
            // devo trovare un nuovo id per il documento del goal,
            // che non può essere il title, altrimenti, come si è visto
            // ho creato del coupling che rende l'applicazione instabile
          });
          return { data: updatedGoalData };
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
} = firestoreApi;
