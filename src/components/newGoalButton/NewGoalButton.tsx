import "./NewGoalButton.scss";
import { useState } from "react";
import GoalForm from "../goalForm/goalForm";

function NewGoalButton() {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  function onAddGoalButtonClick() {
    setShowNewGoalForm(true);
  }

  return (
    <div className="newGoalButton newGoalButton__wrapper">
      <button
        className="newGoalButton__button cta"
        onClick={onAddGoalButtonClick}>
        +
      </button>
      {showNewGoalForm && (
        <Modal onClose={() => setShowNewGoalForm(false)}>
          <GoalForm mode={"newGoal"} goalTitle={goalTitle} goal={goalScore} />
        </Modal>
      )}
    </div>
  );
}

export default NewGoalButton;
