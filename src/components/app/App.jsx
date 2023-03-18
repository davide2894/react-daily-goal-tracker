import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Goals from "../goals/Goals";
import MyAccount from "../myAccount/MyAccount";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="goals" element={<Goals />}></Route>
        <Route path="myAccount" element={<MyAccount />}></Route>
      </Routes>
    </div>
  );
}

export default App;
