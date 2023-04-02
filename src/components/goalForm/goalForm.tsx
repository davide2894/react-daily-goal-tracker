function goalForm() {
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
        Edit goal
      </button>
    </form>
  );
}

export default goalForm;
function uuidv4(): any {
  throw new Error("Function not implemented.");
}
