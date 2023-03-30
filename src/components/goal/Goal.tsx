import "./Goal.scss";
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
  const goalWrapperClasses = `goal ${
    goal && goal.isComplete ? "goal--completed" : ""
  }`;
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
    <div data-testid="goalTest" className={goalWrapperClasses}>
      <p className="goal__title">{goal.title}</p>
      <div className="score">
        <div className="score__numbers">
          <span className="score__actual">{goal.score.actual}</span>
          <span className="score__separator">/</span>
          <span className="score__toReach">{goal.score.max}</span>
        </div>
        <div className="score__ctas">
          <button
            title="decrease score by 1"
            className="score__button score__button--decrease"
            onClick={() => setDecrementGoalScore({ goal, currentUser })}
            disabled={goal.score.actual === goal.score.min || goal.isComplete}>
            <span className="icon score__buttonIcon score__buttonIcon--decreaseScore"></span>
          </button>
          <button
            title="increase score by 1"
            className="score__button score__button--increase"
            onClick={() => setIncrementGoalScore({ goal, currentUser })}
            disabled={goal.score.actual === goal.score.max || goal.isComplete}>
            <span className="icon score__buttonIcon score__buttonIcon--increaseScore"></span>
          </button>
        </div>
        <div className="score__otherActionsWrapper">
          <button
            title="edit goal"
            className="score__button score__button--edit"
            disabled={goal.isComplete}
            onClick={onEditFormOpenHandler}>
            <span className="icon score__buttonIcon score__buttonIcon--edit"></span>
          </button>
          <button
            title="delete goal"
            className="score__button score__button--delete"
            onClick={() => deleteGoal({ goal, currentUser })}>
            <span className="icon score__buttonIcon score__buttonIcon--delete"></span>
          </button>
          <button
            title="reset goal score"
            className="score__button score__button--reset"
            disabled={goal.score.actual === 0}
            onClick={() => resetGoal({ goal, currentUser })}>
            <span className="icon score__buttonIcon score__buttonIcon--reset"></span>
          </button>
          {showEditGoalForm && (
            <EditGoalForm
              onCloseProp={onEditFormCloseHandler}
              id={goal.id}
              titleToEdit={goal.title}
              maxScoreToEdit={goal.score.max}
            />
          )}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default Goal;