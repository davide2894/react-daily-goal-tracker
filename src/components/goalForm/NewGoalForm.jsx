import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useAddGoalMutation } from "../../redux/slices/goalsApi";

function NewGoalForm({ onCloseProp }) {
  const [goalTitle, setGoalTitle] = useState("");
  const [goalScore, setGoalScore] = useState("");

  const [setAddGoal] = useAddGoalMutation();
  const currentUser = useSelector((state) => state.userReducer.user);

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
    setAddGoal({ newGoal, currentUser });
    onCloseProp();
  }

  return (
    <>
      <button className="goalForm__close" onClick={onCloseProp}>
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
    </>
  );
}

export default NewGoalForm;
