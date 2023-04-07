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

  if (arr1.length > arr2.length) {
    console.log("a goal was added");
    // find in arr1 the goal which is not in array 2
    const newGoal = arr1.filter(
      (arr1Goal) => !arr2.some((goal) => goal.id === arr1Goal.id)
    );
    // push this goal to firebase
  } else if (arr1.length < arr2.length) {
    // find in arr1 the goal which is not in array 2
    console.log("a goal was deleted");
    const deletedGoal = arr2.filter(
      (arr2Goal) => !arr1.some((goal) => goal.id === arr2Goal.id)
    );
    // push this goal to firebase
  } else {
    arr1.forEach((goal) => {
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
          return;
        } else {
          console.log({
            "compare-result": "equal",
            existingGoal,
            goal,
          });
          return;
        }
      } else {
        console.log({
          msg: "this goal does not appear in the previous goals",
          goal,
        });
        return;
        // new goal does not exist in old array of goals
        // which means this is either a new goal or a delete goal
      }
    });
    }
};

export default getDifference;
