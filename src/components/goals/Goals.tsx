import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { useAppSelector } from "../../redux/store";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorLogger from "../errorLogger/ErrorLogger";
import { ReactFragment } from "react";
import useSyncFirestoreDb from "../../utils/UseSyncFirestoreDB";

function Goals() {
  const currentUser = useAppSelector((state) => state.userReducer.user);

  //@TODO: fetch from firebase all the goals associated to the logged user
  const goals = useAppSelector((state) => state.goalReducer.goals);
  const navigate = useNavigate();
  const syncFireBaseDb = useSyncFirestoreDb(goals);
  const x = "";
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

  if (goals.length > 0) {
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
