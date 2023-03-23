import "./Goal.scss";
import { deleteGoal } from "../../redux/slices/goalSlice";
import EditGoalForm from "../editGoalForm/EditGoalForm";
import { useState } from "react";
import {
  useDecrementGoalScoreMutation,
  useDeleteGoalMutation,
  useIncrementGoalScoreMutation,
  useResetGoalMutation,
} from "../../redux/slices/goalsApi";

function Goal({ goal, currentUser }) {
  const [showEditGoalForm, setShowEditGoalForm] = useState(false);
  const [isComplete, setIsComplete] = useState(
    goal.score.max === goal.score.actual
  );
  const goalWrapperClasses = `goal ${goal.isComplete ? "goal--completed" : ""}`;
  const [setDecrementGoalScore] = useDecrementGoalScoreMutation();
  const [setIncrementGoalScore] = useIncrementGoalScoreMutation();
  const [deleteGoal] = useDeleteGoalMutation();
  const [resetGoal] = useResetGoalMutation();

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
          onClick={() => setDecrementGoalScore({ goal, currentUser })}
          disabled={goal.score.actual === goal.score.min || isComplete}>
          -
        </button>
        <span className="score__actual">{goal.score.actual}</span>
        <span className="score__separator">/</span>
        <span className="score__toReach">{goal.score.max}</span>
        <button
          className="score__increase"
          onClick={() => setIncrementGoalScore({ goal, currentUser })}
          disabled={goal.score.actual === goal.score.max || isComplete}>
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
          onClick={() => deleteGoal({ goal, currentUser })}>
          ***DELETE***
        </button>
        <button
          className="score__cta score__cta--delete"
          disabled={goal.score.actual === 0}
          onClick={() => resetGoal({ goal, currentUser })}>
          ***RESET***
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
