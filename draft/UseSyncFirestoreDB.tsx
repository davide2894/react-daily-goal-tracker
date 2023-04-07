import { useEffect } from "react";

const useSyncFirestoreDb = () => {
  // const goals = useSelector(...)
  // const previousGoals = usePrevous(goals)
  // const user = useSelector(state.user)

  useEffect(() => {
    // diff

    // update
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
  }, [goals]);
};

export default useSyncFirestoreDb;
