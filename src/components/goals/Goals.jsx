import React, { useState } from "react";
import Goal from "../goal/Goal";

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
      Goals
      {goalsList &&
        goalsList.map((goal) => {
          return <Goal goal={goal} />;
        })}
    </div>
  );
}

export default Goals;
