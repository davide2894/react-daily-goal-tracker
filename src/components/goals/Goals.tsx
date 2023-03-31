import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useAppSelector } from "../../redux/store";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFetchGoalsQuery } from "../../redux/slices/goalsApi";
import ErrorLogger from "../errorLogger/ErrorLogger";

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
      {isError && (
        <ErrorLogger errorMessage={"Server error. Try again later :("} />
      )}
      {isSuccess && goals ? (
        goals.map((goal) => {
          return <Goal key={goal.id} goal={goal} currentUser={currentUser} />;
        })
      ) : (
        <ErrorLogger
          errorMessage={
            "Oho! It appears you don't have any goals yet. Try add one :)"
          }
        />
      )}
    </div>
  );
}

export default Goals;
