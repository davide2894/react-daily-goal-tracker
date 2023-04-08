import { Goal } from "../types";
import isEqual from "lodash.isequal";

const getDifference = (arr1: Array<Goal>, arr2: Array<Goal>) => {
  /*
   *
   * basically: whatever update happens,
   * only one goal at a time can be updated,
   * so there will be just one goal which will be updated
   * this update will be triggered by
   * - add goal -> array 2 will have a new object. so array.find or array.some will return false
   * - edit goal -> find object with same id but with .isEqual returns false
   *   - title
   *   - score.max
   * - delete goal
   *    -> goal from previousGoals
   *        -> I won't find the deleted goal in new goals array
   * - increase score -> find object with same id but with .isEqual returns false
   * - decrease score -> find object with same id but with .isEqual returns false
   * - reset score -> find object with same id but with .isEqual returns false
   *
   * find difference
   * - compare newGoals VS previousGoals
   * - loop through newGoals
   * -  for each newGoal
   * -  try to find newGoal among the previousGoals by trying to match the id (array.find)
   * - if find
   *    - possible changes are:
   *        - increased score
   *        - decreased score
   *        - reset score
   *    - are they equal?
   *      - if yes -> skip
   *      - if not -> push to difference
   * - if not find it means this newGoal not an updated but an actual addition
   * - what about goal deleted? what do I expect to find?
   *
   */
  let goalToReturn: Goal = {
    id: "",
    title: "",
    score: {
      min: 0,
      max: 0,
      actual: 0,
    },
  };
  let typeOfDifference: string = "";

  if (arr1.length > arr2.length) {
    console.log("a goal was added");
    // find in arr1 the goal which is not in array 2
    const newGoal = arr1.filter(
      (arr1Goal) => !arr2.some((goal) => goal.id === arr1Goal.id)
    );
    goalToReturn = newGoal[0];
    typeOfDifference = "new goal";
    // push this goal to firebase
  } else if (arr1.length < arr2.length) {
    // find in arr1 the goal which is not in array 2
    console.log("a goal was deleted");
    const deletedGoal = arr2.filter(
      (arr2Goal) => !arr1.some((goal) => goal.id === arr2Goal.id)
    );
    goalToReturn = deletedGoal[0];
    typeOfDifference = "deleted";
    // push this goal to firebase
  } else {
    for (let i = 0; i < arr1.length; i++) {
      const goal = arr1[i];
      const existingGoal = arr2.find((arr2goal) => arr2goal.id === goal.id);
      if (existingGoal) {
        console.log({
          msg: "goal already exists",
          goal,
        });
        if (!isEqual(goal, existingGoal)) {
          // push update to firestore
          console.log({
            "compare-result": "NOT equal",
            existingGoal,
            goal,
          });
          goalToReturn = goal;
          typeOfDifference = "update";
          break;
        }
      }
    }
  }

  return { goalToReturn, typeOfDifference };
};

export default getDifference;
