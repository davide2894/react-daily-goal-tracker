import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Goals from "../goals/Goals";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="goals" element={<Goals />}></Route>
      </Routes>
    </div>
  );
}

export default App;
