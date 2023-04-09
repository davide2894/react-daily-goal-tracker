import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useAppSelector } from "../../redux/store";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorLogger from "../errorLogger/ErrorLogger";
import { ReactFragment, useEffect } from "react";
import { useDebounce } from "use-debounce";
import useSyncFirestoreDb from "../../utils/UseSyncFirestoreDB";
import { useFetchGoalsQuery } from "../../redux/slices/goalsApi";
import { useDispatch } from "react-redux";
import { syncWithBackend } from "../../redux/slices/goalSlice";

function Goals() {
  console.log("Goals component rendered");
  const currentUser = useAppSelector((state) => state.userReducer.user);
  const goals = useAppSelector((state) => state.goalReducer.goals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: goalsFromDB, isSuccess } = useFetchGoalsQuery(currentUser);

  const debouncedGoals = useDebounce(goals, 350, { trailing: true });
  useSyncFirestoreDb(debouncedGoals[0], currentUser.userDocId);

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
    console.log("Goals -> useEffect to sync backend to local state");
    dispatch(syncWithBackend(goalsFromDB));
    return () => {
      console.log(
        "cleaning up Goals -> useEffect to sync backend to local state"
      );
    };
  }, [dispatch, goalsFromDB]);

  if (isSuccess && goalsFromDB && goalsFromDB.length && goals && goals.length) {
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
