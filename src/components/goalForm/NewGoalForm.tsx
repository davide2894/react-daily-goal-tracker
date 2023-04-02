import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAddGoalMutation } from "../../redux/slices/goalsApi";
import { useAppSelector } from "../../redux/store";
import { Goal } from "../../types";

function NewGoalForm({}) {
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

  return <div></div>;
}

export default NewGoalForm;
