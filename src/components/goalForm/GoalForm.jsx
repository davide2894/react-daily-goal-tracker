import "./GoalForm.scss";
import { v4 as uuidv4 } from "uuid";
import { addGoal } from "../../redux/slices/goalSlice";
import {
  setGoalTitle,
  setGoalScore,
  hideForm,
} from "../../redux/slices/goalFormSlice";
import { useDispatch, useSelector } from "react-redux";

function GoalForm() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.goalFormReducer.show);
  const goalTitle = useSelector((state) => state.goalFormReducer.goalTitle);
  const goalScore = useSelector((state) => state.goalFormReducer.goalScore);

  function onFormSubmit(evt) {
    evt.preventDefault();
    const newGoal = {
      title: goalTitle,
      score: {
        max: parseInt(goalScore),
        min: 0,
        actual: 0,
      },
      isComplete: false,
      id: uuidv4(),
    };
    dispatch(addGoal(newGoal));
  }

  return (
    show && (
      <>
        <button
          className="goalForm__close"
          onClick={() => dispatch(hideForm())}>
          X
        </button>
        <div className="goalForm">
          <form onSubmit={(evt) => onFormSubmit(evt)}>
            <div className="goalForm__name">
              <label htmlFor="nameInput">
                Goal title:
                <input
                  type="text"
                  name="name"
                  id="nameInput"
                  value={goalTitle}
                  onChange={(evt) => {
                    dispatch(setGoalTitle(evt.target.value));
                  }}
                />
              </label>
            </div>
            <div className="goalForm__score">
              <label htmlFor="scoreInput">
                times to meet per week
                <input
                  type="number"
                  name="score"
                  id="scoreInput"
                  value={goalScore}
                  onChange={(evt) => {
                    dispatch(setGoalScore(evt.target.value));
                  }}
                />
              </label>
            </div>
            <button type="submit" value="Submit">
              Add goal
            </button>
          </form>
        </div>
      </>
    )
  );
}

export default GoalForm;
