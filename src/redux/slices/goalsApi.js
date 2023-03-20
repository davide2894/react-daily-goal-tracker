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
      queryFn(loggedUserId) {
        db.collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              const userDocData = doc.data();
              if (userDocData.uid === loggedUserId) {
                console.log(userDocData);
              }
            });
          });
        // const citiesRef = db.collection("cities");
        // citiesRef.get().then
        // const query = citiesRef.where("state", "==", "CA");
        return { data: "test" };
      },
    }),
  }),
});

export const { useFetchGoalsQuery } = firestoreApi;
