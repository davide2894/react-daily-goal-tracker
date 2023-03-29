import React from "react";
import "./MyAccount.scss";
import Register from "../register/Register";
import Login from "../login/Login";

function MyAccount() {
  return (
    <div className="myAccount">
      <Register />
      <div className="myAccount__separatorH2">
        <h2>OR</h2>
      </div>
      <Login />
    </div>
  );
}

export default MyAccount;
