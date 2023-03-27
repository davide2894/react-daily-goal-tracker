import { useState } from "react";
import { useEditGoalMutation } from "../../redux/slices/goalsApi";
import { useSelector } from "react-redux";

function EditGoalForm({ onCloseProp, id, titleToEdit, maxScoreToEdit }) {
  const [newTitle, setNewTitle] = useState(titleToEdit || "");
  const [newMaxScore, setNewMaxScore] = useState(maxScoreToEdit || "");

  const currentUser = useSelector((state) => state.userReducer.user);
  const [editGoal] = useEditGoalMutation();

  function onFormSubmit(evt) {
    evt.preventDefault();

    const updatedGoalData = {
      newTitle,
      newMaxScore,
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
                value={newTitle}
                onChange={(evt) => {
                  setNewTitle(evt.target.value);
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
                value={newMaxScore}
                onChange={(evt) => {
                  setNewMaxScore(evt.target.value);
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
