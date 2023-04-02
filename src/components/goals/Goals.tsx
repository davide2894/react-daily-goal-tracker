import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useAppSelector } from "../../redux/store";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFetchGoalsQuery } from "../../redux/slices/goalsApi";
import ErrorLogger from "../errorLogger/ErrorLogger";
import { ReactFragment } from "react";

function Goals() {
  const currentUser = useAppSelector((state) => state.userReducer.user);
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

  if (isSuccess && goals.length > 0) {
    content = goals.map((goal) => {
      return <Goal key={goal.id} goal={goal} currentUser={currentUser} />;
    });
  } else if (isError) {
    content = <ErrorLogger errorMessage={"Server error. Try again later :("} />;
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
