import React from "react";
import "./Goal.scss";

function Goal({ goal }) {
  return (
    <div className="goal">
      <p className="goal__title">{goal.title}</p>
      <div className="score">
        <button className="score__decrease">-</button>
        <span className="score__actual">{goal.score.min}</span>
        <span className="score__separator">/</span>
        <span className="score__toReach">{goal.score.max}</span>
        <button className="score__increase">+</button>
      </div>
    </div>
  );
}

export default Goal;
