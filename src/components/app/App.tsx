import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../home/Home";
import MyAccount from "../myAccount/MyAccount";
import Goals from "../goals/Goals";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="goals" element={<Goals />}></Route>
        <Route path="myAccount" element={<MyAccount />}></Route>
      </Routes>
    </div>
  );
}

export default App;
