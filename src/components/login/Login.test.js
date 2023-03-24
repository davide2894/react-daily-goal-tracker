import { login } from "../../redux/slices/userSlice";
import Login from "./Login";
import { render, screen } from "@testing-library/react";

test("should render Login component", () => {
  render(<Login />);
  const loginComponentWrapper = screen.getByTestId("test");
  expect(loginComponentWrapper).toBeInTheDocument();
});
