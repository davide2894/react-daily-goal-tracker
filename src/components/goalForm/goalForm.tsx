import { useState } from "react";
import {
  useAddGoalMutation,
  useEditGoalMutation,
} from "../../redux/slices/goalsApi";
import { useAppSelector } from "../../redux/store";
import { v4 as uuidv4 } from "uuid";
import { Goal, FormProps } from "../../types";

function GoalForm(props: FormProps) {
  const [goalTitle, setGoalTitle] = useState(
    props.titleToEdit ? props.titleToEdit : ""
  );
  const [goalScore, setGoalScore] = useState(
    props.maxScoreToEdit ? props.maxScoreToEdit : ""
  );

  const [addGoal] = useAddGoalMutation();
  const [editGoal] = useEditGoalMutation();
  const currentUser = useAppSelector((state) => state.userReducer.user);

  function onFormSubmit(evt) {
    evt.preventDefault();

    const goal: Goal = {
      title: goalTitle,
      score: {
        max: parseInt(goalScore),
        min: 0,
        actual: 0,
      },
      isComplete: false,
      id: props.id ? props.id : uuidv4(),
    };

    if (props.mode) {
      if (props.mode === "add") {
        addGoal({ goal, currentUser });
      } else if (props.mode === "edit") {
        editGoal({ goal, currentUser });
      }
    }

    if (props.onGoalFormSubmit) {
      props.onGoalFormSubmit();
    }
  }

  return (
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
            value={goalScore}
            onChange={(evt) => {
              setGoalScore(evt.target.value);
            }}
          />
        </label>
      </div>
      <button type="submit" value="Submit">
        Submit
      </button>
    </form>
  );
}

export default GoalForm;
