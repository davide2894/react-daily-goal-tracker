import React from "react";
import "./Home.scss";
import MyAccount from "../myAccount/MyAccount";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import Goals from "../goals/Goals";
import Loader from "../loader/Loader";

function Home() {
  const [isUserLogged, setIsUserLogged] = useState<undefined | Boolean>(
    undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged");
      if (user) {
        setIsUserLogged(true);
        dispatch(
          login({
            email: user.email !== null ? user.email : "",
            uid: user.uid,
            userDocId: `${user.email}-${user.uid}`,
          })
        );
      } else {
        setIsUserLogged(false);
      }
    });

    return () => {
      console.log("onAuthStateChanged return fn");
    };
  }, []);

  let content:
    | string
    | number
    | boolean
    | JSX.Element
    | React.ReactFragment
    | null
    | undefined;

  if (typeof isUserLogged !== "undefined") {
    if (isUserLogged) {
      content = <Goals />;
    } else {
      content = (
        <div className="home__welcomeMessage">
          <h1>WELCOME TO DAILY GOAL TRACKER</h1>
          <MyAccount />
        </div>
      );
    }
  } else {
    content = <Loader />;
  }

  return <div className="home">{content}</div>;
}

export default Home;
