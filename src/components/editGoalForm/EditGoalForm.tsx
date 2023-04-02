import { useState } from "react";
import { useEditGoalMutation } from "../../redux/slices/goalsApi";
import { useAppSelector } from "../../redux/store";

function EditGoalForm({ onCloseProp, id, titleToEdit, maxScoreToEdit }) {
  const [newTitle, setNewTitle] = useState(titleToEdit || "");
  const [newMaxScore, setNewMaxScore] = useState(maxScoreToEdit || "");

  const currentUser = useAppSelector((state) => state.userReducer.user);
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
      <div className="editGoalForm modalOverlay">
        <button
          className="editGoalForm__close modalOverlay__closeButton"
          onClick={onCloseProp}>
          <span className="modalOverlay__closeIcon"></span>
        </button>
        <div className="modalOverlay__main">
          <div className="modalOverlay__content form">
            <h2 className="modalOverlay__h2">Edit Goal</h2>

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
        </div>
      </div>
    </>
  );
}

export default EditGoalForm;
