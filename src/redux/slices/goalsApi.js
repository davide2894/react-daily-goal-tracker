// src/features/scores/scoresSlice.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
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
  }),
});

export const { useFetchGoalsQuery } = firestoreApi;
