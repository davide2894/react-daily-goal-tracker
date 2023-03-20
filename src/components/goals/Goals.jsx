import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFetchGoalsQuery } from "../../redux/slices/goalsApi";

function Goals() {
  const goals = useSelector((state) => state.goalReducer.goals);
  const currentUser = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchGoalsQuery(currentUser);
  const x = "";

  //TODO:
  // - use goals fetched from firestore to fill state
  // - remove hardcoded goals from initialstate slice

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("user was successfully signed out");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.error(error.message);
      });
  }

  return (
    <div className="goals">
      <button className="cta cta__signOut" onClick={handleSignOut}>
        Sign Out
      </button>
      <p>Goals</p>
      <NewGoalButton />
      {goals &&
        goals.map((goal, idx) => {
          return <Goal key={idx} goal={goal} />;
        })}
    </div>
  );
}

export default Goals;
