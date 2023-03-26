import { useState } from "react";
import { useEditGoalMutation } from "../../redux/slices/goalsApi";
import { useSelector } from "react-redux";

function EditGoalForm({ onCloseProp, goalTitleToEdit, goalScoreToEdit, id }) {
  const [goalTitle, setGoalTitle] = useState(goalTitleToEdit || "");
  const [goalScore, setGoalScore] = useState(goalScoreToEdit || "");

  const currentUser = useSelector((state) => state.userReducer.user);
  const [editGoal] = useEditGoalMutation();

  function onFormSubmit(evt) {
    evt.preventDefault();

    const updatedGoalData = {
      originalTitle: goalTitleToEdit,
      newTitle: goalTitle,
      newMaxScore: goalScore,
      id: id,
    };

    editGoal({ updatedGoalData, currentUser });
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
