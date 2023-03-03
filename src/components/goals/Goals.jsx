import React, { useState } from "react";
import Goal from "../goal/Goal";
import "./Goals.scss";
import { Link } from "react-router-dom";

function Goals() {
  const [goalsList, setGoalsList] = useState([
    {
      title: "my first goal",
      score: {
        max: 5,
        min: 0,
      },
    },
  ]);

  return (
    <div className="goals">
      <Link path="home" to="/" className="cta cta__home">
        Go back home
      </Link>
      <p>Goals</p>
      {goalsList &&
        goalsList.map((goal) => {
          return <Goal goal={goal} />;
        })}
    </div>
  );
}

export default Goals;
