import Register from "../Register";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("Register component renders correctly", () => {
  render(<Register />);
  const registerComponentWrapper = screen.getByTestId(
    "registerComponentTestElement"
  );
  expect(registerComponentWrapper).toBeInTheDocument();
  expect(registerComponentWrapper).toHaveClass("myAccount__form ");
  expect(registerComponentWrapper).toHaveClass("myAccount__form--register");
});

test("Register component matches its own snapshot", () => {
  const tree = renderer.create(<Register />).toJSON();
  expect(tree).toMatchSnapshot();
});
