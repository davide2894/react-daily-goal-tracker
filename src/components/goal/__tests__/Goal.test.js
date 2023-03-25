import Goal from "../Goal";
import { cleanup, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/testUtils";

afterEach(() => {
  cleanup();
});

const goal = {
  id: "ed04edbb-8ced-4cdf-a629-c7a57bd5824e",
  isComplete: false,
  title: "sqsq",
  score: {
    max: 5,
    actual: 1,
    min: 0,
  },
};
const currentUser = {
  email: "testcurrentuseremailforreact@yopmail.com",
  uid: "bbgQNkAxgEZrxB5ZkEXZIAdZARB2",
  userDocId:
    "testcurrentuseremailforreact@yopmail.com-bbgQNkAxgEZrxB5ZkEXZIAdZARB2",
};

test("Goal component renders correctly", () => {
  renderWithProviders(<Goal goal={goal} currentUser={currentUser} />);
  const goalComponentWrapper = screen.getByTestId("goalTest");
  expect(goalComponentWrapper).toBeInTheDocument();
  expect(goalComponentWrapper).toHaveClass("goal");
});
