import React from "react";
import { Navigate } from "react-router-dom";
import "./Home.scss";
import MyAccount from "../myAccount/MyAccount";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";

function Home() {
  const [isUserLogged, setIsUserLogged] = useState("");
  const dispatch = useDispatch();

  // check user
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLogged(true);
        dispatch(login(user.uid));
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
