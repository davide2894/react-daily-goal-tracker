import { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import usePrevious from "./usePrevious";
import { Goal } from "../types";
import getDifference from "./getDifference";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
/***
 * TODO
 * - get goals via useselector
 * - useeffect that is triggered everytime goals is updated
 * - diff prev goals VS new goals
 * - push update to firebase, associating them to logged user
 */

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

const useSyncFirestoreDb = (goals) => {
  const previousGoals = usePrevious(goals);
  const user = useAppSelector((state) => state.userReducer.user);
  const userDocId = user.userDocId;

  useEffect(() => {
    console.log("useSyncFirestoreDb effect");
    const isDiff = JSON.stringify(previousGoals) !== JSON.stringify(goals);

    if (isDiff && typeof previousGoals !== "undefined") {
      const diffResult = getDifference(goals, previousGoals);
      console.log({
        msg: "updating user goal",
        goal: diffResult.goalToReturn,
        type: diffResult.typeOfDifference,
        user: userDocId,
      });
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
