import "./App.scss";
import Home from "../home/Home";
import Goals from "../goals/Goals";
import MyAccount from "../myAccount/MyAccount";
import { createHashRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "myAccount",
      element: <MyAccount />,
    },
    {
      path: "goals",
      element: <Goals />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
