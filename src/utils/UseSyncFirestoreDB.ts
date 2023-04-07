import { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import usePrevious from "./usePrevious";
import { Goal } from "../types";
import getDifference from "./getDifference";
/***
 * TODO
 * - get goals via useselector
 * - useeffect that is triggered everytime goals is updated
 * - diff prev goals VS new goals
 * - push update to firebase, associating them to logged user
 */

// update
// try {
//   const docRef = doc(
//     db,
//     `/users/${currentUser.userDocId}/user-goals/`,
//     goal.id
//   );
//   await setDoc(docRef, goal, { merge: true });
//   return { data: "ok" };
// } catch (err) {
//   return { error: err };
// }

const useSyncFirestoreDb = (goals: Array<Goal>) => {
  const previousGoals = usePrevious(goals);
  // const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    console.log("useSyncFirestoreDb effect");
    const isDiff = JSON.stringify(previousGoals) !== JSON.stringify(goals);

    if (isDiff && typeof previousGoals !== "undefined") {
      getDifference(goals, previousGoals);
    }
    return;
  }, [goals, previousGoals]);
};

export default useSyncFirestoreDb;
