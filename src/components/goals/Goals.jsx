import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFetchGoalsQuery } from "../../redux/slices/goalsApi";

function Goals() {
  const currentUser = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const {
    data: goals,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGoalsQuery(currentUser);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("user was successfully signed out");
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  if (isSuccess) {
    console.log({ isSuccess: goals });
  }

  return (
    <div className="goals">
      <button className="cta cta_ _signOut" onClick={handleSignOut}>
        Sign Out
      </button>
      <p>Goals</p>
      <NewGoalButton />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Server error. Try again later.</div>}
      {goals &&
        goals.map((goal, idx) => {
          return <Goal key={idx} goal={goal} />;
        })}
    </div>
  );
}

export default Goals;
