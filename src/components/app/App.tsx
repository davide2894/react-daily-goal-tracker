import "./App.scss";
import Home from "../home/Home";
import Goals from "../goals/Goals";
import MyAccount from "../myAccount/MyAccount";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
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
