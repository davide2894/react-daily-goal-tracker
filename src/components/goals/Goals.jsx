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
        actual: 0,
      },
    },
  ]);

  function onIncrementHandler() {
    setGoalsList((prevGoaList) =>
      prevGoaList.map((prevGoal) => {
        return {
          ...prevGoal,
          score: {
            ...prevGoal.score,
            actual: prevGoal.score.actual++,
          },
        };
      })
    );
  }

  function onDecreaseHandler() {
    setGoalsList((prevGoaList) =>
      prevGoaList.map((prevGoal) => {
        return {
          ...prevGoal,
          score: {
            ...prevGoal.score,
            actual: prevGoal.score.actual--,
          },
        };
      })
    );
  }

  return (
    <div className="goals">
      <Link path="home" to="/" className="cta cta__home">
        Go back home
      </Link>
      <p>Goals</p>
      {goalsList &&
        goalsList.map((goal, idx) => {
          return (
            <Goal
              key={idx}
              goal={goal}
              onIncrement={onIncrementHandler}
              onDecrease={onDecreaseHandler}
            />
          );
        })}
    </div>
  );
}

export default Goals;
