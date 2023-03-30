import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFetchGoalsQuery } from "../../redux/slices/goalsApi";
import { User } from "../../types";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";

function Goals() {
  const currentUser = useSelector((state: User) => state.user);
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
      <button
        className="cta cta__signOut"
        onClick={handleSignOut}
        title="sing out">
        <span className="cta__signOutIcon"></span>
      </button>
      <h1 className="goals__h1">Goals</h1>
      <NewGoalButton />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Server error. Try again later.</div>}
      {isSuccess && goals ? (
        goals.map((goal) => {
          return <Goal key={goal.id} goal={goal} currentUser={currentUser} />;
        })
      ) : (
        <div>
          oops! it appears you don't have any goals yet. start your growing
          journey now!
        </div>
      )}
    </div>
  );
}

export default Goals;
