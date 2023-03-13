import "./Goal.scss";
import { incrementScore, decrementScore } from "../../redux/slices/goalSlice";
import { useDispatch } from "react-redux";

function Goal({ goal, onScoreIncrease, onScoreDecrease }) {
  const dispatch = useDispatch();
  const goalWrapperClasses = `goal ${goal.isComplete ? "goal--completed" : ""}`;

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
          onClick={() => {
            dispatch(incrementScore(goal));
          }}
          disabled={goal.score.actual === goal.score.max || goal.isComplete}>
          +
        </button>
        <button
          className="score__cta score__cta--edit"
          disabled={goal.isComplete}>
          ***EDIT***
        </button>
        <button
          className="score__cta score__cta--delete"
          disabled={goal.isComplete}>
          ***DELETE***
        </button>
      </div>
    </div>
  );
}

export default Goal;
