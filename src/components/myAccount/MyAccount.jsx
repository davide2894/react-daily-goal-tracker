import React from "react";
import "./MyAccount.scss";
import Register from "../register/Register";
import Login from "../login/Login";

function MyAccount() {
  return (
    <div className="myAccount">
      <Register />
      <Login />
    </div>
  );
}

export default MyAccount;
