import Goal from "../goal/Goal";
import "./Goals.scss";
import NewGoalButton from "../newGoalButton/NewGoalButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Goals() {
  const goals = useSelector((state) => state.goalReducer.goals);

  return (
    <div className="goals">
      <Link path="home" to="/" className="cta cta__home">
        Go back home
      </Link>
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
