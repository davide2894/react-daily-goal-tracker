import "./NewGoalButton.scss";
import NewGoalForm from "../goalForm/NewGoalForm";
import { useState } from "react";

function NewGoalButton() {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  function onAddGoalButtonClick() {
    setShowNewGoalForm(true);
  }

  function onCloseButtonClick() {
    setShowNewGoalForm(false);
  }

  return (
    <div className="newGoalButton newGoalButton__wrapper">
      <button
        className="newGoalButton__button cta"
        onClick={onAddGoalButtonClick}>
        +
      </button>
      {showNewGoalForm && <NewGoalForm onCloseProp={onCloseButtonClick} />}
    </div>
  );
}

export default NewGoalButton;
