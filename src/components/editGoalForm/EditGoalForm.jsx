import { useState } from "react";
import { updateGoal } from "../../redux/slices/goalSlice";
import { useDispatch } from "react-redux";

function EditGoalForm({ onCloseProp, goalTitleToEdit, goalScoreToEdit, id }) {
  const [goalTitle, setGoalTitle] = useState(goalTitleToEdit || "");
  const [goalScore, setGoalScore] = useState(goalScoreToEdit || "");

  const dispatch = useDispatch();

  function onFormSubmit(evt) {
    evt.preventDefault();
    const updatedGoalData = {
      title: goalTitle,
      score: goalScore,
      id: id,
    };
    dispatch(updateGoal(updatedGoalData));
    onCloseProp();
  }

  return (
    <>
      <button className="editGoalForm__close" onClick={onCloseProp}>
        X
      </button>
      <div className="editGoalForm">
        <form onSubmit={(evt) => onFormSubmit(evt)}>
          <div className="editGoalForm__name">
            <label htmlFor="nameInput">
              Goal title:
              <input
                type="text"
                name="name"
                id="nameInput"
                value={goalTitle}
                onChange={(evt) => {
                  setGoalTitle(evt.target.value);
                }}
              />
            </label>
          </div>
          <div className="editGoalForm__score">
            <label htmlFor="scoreInput">
              times to meet per week
              <input
                type="number"
                name="score"
                id="scoreInput"
                value={goalScore.max}
                onChange={(evt) => {
                  setGoalScore(evt.target.value);
                }}
              />
            </label>
          </div>
          <button type="submit" value="Submit">
            Edit goal
          </button>
        </form>
      </div>
    </>
  );
}

export default EditGoalForm;
