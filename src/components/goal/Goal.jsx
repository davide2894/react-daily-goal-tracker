import React, { useState } from "react";
import "./Goal.scss";

function Goal({ goal, onIncrement, onDecrease }) {
  return (
    <div className="goal">
      <p className="goal__title">{goal.title}</p>
      <div className="score">
        <button
          className="score__decrease"
          onClick={onDecrease}
          disabled={goal.score.actual === goal.score.min}>
          -
        </button>
        <span className="score__actual">{goal.score.actual}</span>
        <span className="score__separator">/</span>
        <span className="score__toReach">{goal.score.max}</span>
        <button
          className="score__increase"
          onClick={onIncrement}
          disabled={goal.score.actual === goal.score.max}>
          +
        </button>
        <button className="score__cta score__cta--edit">***EDIT***</button>
        <button className="score__cta score__cta--delete">***EDIT***</button>
      </div>
    </div>
  );
}

export default Goal;
