import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAddGoalMutation } from "../../redux/slices/goalsApi";
import { useAppSelector } from "../../redux/store";
import { Goal } from "../../types";

function NewGoalForm({ onCloseProp }) {
  const [goalTitle, setGoalTitle] = useState("");
  const [goalScore, setGoalScore] = useState("");

  const [setAddGoal] = useAddGoalMutation();
  const currentUser = useAppSelector((state) => state.userReducer.user);

  function onFormSubmit(evt) {
    evt.preventDefault();

    const newGoal: Goal = {
      title: goalTitle,
      score: {
        max: parseInt(goalScore),
        min: 0,
        actual: 0,
      },
      isComplete: false,
      id: uuidv4(),
    };

    setAddGoal({ newGoal, currentUser });
    onCloseProp();
  }

  return (
    <>
      <div className="modalOverlay">
        <button className="modalOverlay__closeButton" onClick={onCloseProp}>
          <span className="modalOverlay__closeIcon"></span>
        </button>
        <div className="modalOverlay__main">
          <div className="modalOverlay__content form">
            <h2 className="modalOverlay__h2">Add a new goal</h2>
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
                      setGoalTitle(evt.target.value);
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
                      setGoalScore(evt.target.value);
                    }}
                  />
                </label>
              </div>
              <button type="submit" value="Submit">
                Add goal
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewGoalForm;
