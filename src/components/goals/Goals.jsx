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
      isComplete: false,
    },
  ]);

  function onIncreaseHandler() {
    setGoalsList((prevGoaList) =>
      prevGoaList.map((prevGoal) => {
        const newActual = prevGoal.score.actual + 1;
        return {
          ...prevGoal,
          score: {
            ...prevGoal.score,
            actual: newActual,
          },
          isComplete: newActual === prevGoal.score.max,
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
            actual: prevGoal.score.actual - 1,
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
              onScoreIncrease={onIncreaseHandler}
              onScoreDecrease={onDecreaseHandler}
            />
          );
        })}
    </div>
  );
}

export default Goals;
