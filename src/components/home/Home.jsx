import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import MyAccount from "../myAccount/MyAccount";

function Home() {
  return (
    <div className="home">
      <div className="home__welcomeMessage">
        <p>Welcome to the goals app</p>
        <p>Click on the button below to reach the goals page</p>
      </div>
      <Link path="goals" to="goals" className="cta cta__goals">
        Goals page
      </Link>
      <MyAccount />
    </div>
  );
}

export default Home;
