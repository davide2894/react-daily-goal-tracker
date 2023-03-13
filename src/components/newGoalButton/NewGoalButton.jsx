import "./NewGoalButton.scss";
import GoalForm from "../goalForm/GoalForm";
import { useState } from "react";

function NewGoalButton() {
  const [show, setShow] = useState(false);

  function onAddGoalButtonClick() {
    setShow(true);
  }

  return (
    <div className="newGoalButton newGoalButton__wrapper">
      <button
        className="newGoalButton__button cta"
        onClick={onAddGoalButtonClick}>
        +
      </button>
      <GoalForm mode={"new"} show={true} />
    </div>
  );
}

export default NewGoalButton;
