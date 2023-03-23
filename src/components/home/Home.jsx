import React from "react";
import { Navigate } from "react-router-dom";
import "./Home.scss";
import MyAccount from "../myAccount/MyAccount";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import Goals from "../goals/Goals";

function Home() {
  const [isUserLogged, setIsUserLogged] = useState("");
  const dispatch = useDispatch();

  // check user
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLogged(true);
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            userDocId: `${user.email}-${user.uid}`,
          })
        );
      } else {
        setIsUserLogged(false);
      }
    });
  }, []);

  return (
    <div className="home">
      {isUserLogged ? (
        <Goals />
      ) : (
        <div className="home__welcomeMessage">
          <p>Welcome to the goals app</p>
          <p>Login or register to start working on your goals</p>
          <MyAccount />
        </div>
      )}
    </div>
  );
}

export default Home;
