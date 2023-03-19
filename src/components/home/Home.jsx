import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./Home.scss";
import MyAccount from "../myAccount/MyAccount";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
  const [isUserLogged, setIsUserLogged] = useState("");

  // check user
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLogged(true);
      } else {
        setIsUserLogged(false);
      }
    });
  }, []);

  return (
    <div className="home">
      <div className="home__welcomeMessage">
        <p>Welcome to the goals app</p>
        <p>Click on the button below to reach the goals page</p>
      </div>
      {isUserLogged && <Navigate to="/goals" replace={true} />}
      <MyAccount />
    </div>
  );
}

export default Home;
