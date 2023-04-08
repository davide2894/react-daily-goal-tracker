import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useAppSelector } from "../../redux/store";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorLogger from "../errorLogger/ErrorLogger";
import { ReactFragment, useEffect } from "react";
import useSyncFirestoreDb from "../../utils/UseSyncFirestoreDB";
import { useDebounce } from "use-debounce";
import { useFetchGoalsQuery } from "../../redux/slices/goalsApi";
import { syncWithBackend } from "../../redux/slices/goalSlice";
import { useDispatch } from "react-redux";

function Goals() {
  console.log("Goals component rendered");
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.userReducer.user);
  const goals = useAppSelector((state) => state.goalReducer.goals);
  //@TODO:
  // - check: if goals from firestore -> fetch them
  // - sync with local state
  // - use local state
  // - sync backend every 500 ms if action is detected
  const {
    data: goalsFromDB,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGoalsQuery(currentUser);

  const navigate = useNavigate();
  const debouncedGoals = useDebounce(goals, 500);
  useSyncFirestoreDb(debouncedGoals[0]);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  let content:
    | string
    | number
    | boolean
    | ReactFragment
    | JSX.Element
    | JSX.Element[]
    | null
    | undefined;

  useEffect(() => {
    dispatch(syncWithBackend(goalsFromDB));
    return () => {};
  }, [dispatch, goalsFromDB]);

  if (
    isSuccess &&
    goalsFromDB &&
    goalsFromDB.length > 0 &&
    goals &&
    goals.length
  ) {
    content = goals.map((goal) => {
      return <Goal key={goal.id} goal={goal} currentUser={currentUser} />;
    });
  } else {
    content = (
      <ErrorLogger
        errorMessage={
          "It seems there is an issue. Please try to reload the page"
        }
      />
    );
  }

  return (
    <div className="goals">
      <button
        className="cta cta__signOut"
        onClick={handleSignOut}
        title="sing out">
        <span className="cta__signOutIcon"></span>
      </button>
      <h1 className="goals__h1">Goals</h1>
      <NewGoalButton />
      {content}
    </div>
  );
}

export default Goals;
