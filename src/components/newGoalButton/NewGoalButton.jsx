import "./NewGoalButton.scss";
import GoalForm from "../goalForm/GoalForm";

function NewGoalButton() {
  return (
    <div className="newGoalButton__wrapper">
      <button className="newGoalButton__button cta">+</button>
      <GoalForm mode={"new"} />
    </div>
  );
}

export default NewGoalButton;
