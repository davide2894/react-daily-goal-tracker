import "./NewGoalButton.scss";
import GoalForm from "../goalForm/GoalForm";
import { useDispatch } from "react-redux";
import { showForm } from "../../redux/slices/goalFormSlice";

function NewGoalButton() {
  const dispatch = useDispatch();

  return (
    <div className="newGoalButton newGoalButton__wrapper">
      <button
        className="newGoalButton__button cta"
        onClick={() => dispatch(showForm())}>
        +
      </button>
      <GoalForm />
    </div>
  );
}

export default NewGoalButton;
