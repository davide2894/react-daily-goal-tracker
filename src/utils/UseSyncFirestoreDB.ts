import { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import usePrevious from "./usePrevious";
import getDifference from "./getDifference";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateFirestoreDoc = async (userDocId, goal, type) => {
  const docRef = doc(db, `/users/${userDocId}/user-goals/`, goal.id);

  try {
    if (type === "deleted") {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, goal, { merge: true });
    }
    return "ok";
  } catch (err) {
    return { error: err };
  }
};

const useSyncFirestoreDb = (goals, userDocId) => {
  const previousGoals = usePrevious(goals);

  useEffect(() => {
    console.log("useSyncFirestoreDb effect");
    const isDiff = JSON.stringify(previousGoals) !== JSON.stringify(goals);

    if (
      isDiff &&
      typeof previousGoals !== "undefined" &&
      goals &&
      goals.length
    ) {
      const diffResult = getDifference(goals, previousGoals);
      console.log("updating user goal");
      updateFirestoreDoc(
        userDocId,
        diffResult.goalToReturn,
        diffResult.typeOfDifference
      );
    }
    return () => {
      console.log("cleanup");
    };
  }, [goals, previousGoals, userDocId]);
};

export default useSyncFirestoreDb;
