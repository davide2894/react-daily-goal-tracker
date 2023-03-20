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
  endpoints: (build) => ({
    fetchGoals: build.query({
      queryFn(user) {
        db.collection(`/users/${user.userDocId}/user-goals/`)
          .get()
          .then((querySnapshot) => {
            let goals = [];
            querySnapshot.forEach((doc) => {
              console.log({
                userDocId: user.userDocId,
                docData: doc.data(),
              });
              goals.push(doc.data());
            });
            return { data: goals };
          });
      },
    }),
  }),
});

export const { useFetchGoalsQuery } = firestoreApi;
