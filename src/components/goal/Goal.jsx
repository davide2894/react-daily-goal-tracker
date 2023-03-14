import "./Goal.scss";
import {
  incrementScore,
  decrementScore,
  deleteGoal,
} from "../../redux/slices/goalSlice";
import { useDispatch } from "react-redux";
import EditGoalForm from "../editGoalForm/EditGoalForm";
import { useState } from "react";

function Goal({ goal }) {
  const [showEditGoalForm, setShowEditGoalForm] = useState(false);
  const dispatch = useDispatch();
  const goalWrapperClasses = `goal ${goal.isComplete ? "goal--completed" : ""}`;

  function onEditFormOpenHandler() {
    setShowEditGoalForm(true);
  }

  function onEditFormCloseHandler() {
    setShowEditGoalForm(false);
  }

  return (
    <div className={goalWrapperClasses}>
      <p className="goal__title">{goal.title}</p>
      <div className="score">
        <button
          className="score__decrease"
          onClick={() => dispatch(decrementScore(goal))}
          disabled={goal.score.actual === goal.score.min || goal.isComplete}>
          -
        </button>
        <span className="score__actual">{goal.score.actual}</span>
        <span className="score__separator">/</span>
        <span className="score__toReach">{goal.score.max}</span>
        <button
          className="score__increase"
          onClick={() => dispatch(incrementScore(goal))}
          disabled={goal.score.actual === goal.score.max || goal.isComplete}>
          +
        </button>
        <button
          className="score__cta score__cta--edit"
          disabled={goal.isComplete}
          onClick={onEditFormOpenHandler}>
          ***EDIT***
        </button>
        <button
          className="score__cta score__cta--delete"
          disabled={goal.isComplete}
          onClick={() => dispatch(deleteGoal(goal))}>
          ***DELETE***
        </button>
        {showEditGoalForm && (
          <EditGoalForm
            onCloseProp={onEditFormCloseHandler}
            goalTitleToEdit={goal.title}
            goalScoreToEdit={goal.score}
            id={goal.id}
          />
        )}
      </div>
      <hr></hr>
    </div>
  );
}

export default Goal;
