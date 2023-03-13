import "./GoalForm.scss";

function GoalForm({ mode, show }) {
  return (
    show && (
      <div className="goalForm">
        <form>
          <div className="goalForm__name">
            <label htmlFor="nameInput">
              Goal title:
              <input type="text" name="name" id="nameInput" />
            </label>
          </div>
          <div className="goalForm__score">
            <label htmlFor="scoreInput">
              times to meet per week
              <input type="text" name="score" id="scoreInput" />
            </label>
          </div>
          <button type="submit" value="Submit">
            Add goal
          </button>
        </form>
      </div>
    )
  );
}

export default GoalForm;
