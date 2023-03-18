import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    registerWithEmailAndPassword(email, password);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="myAccount__form myAccount__form--register">
      <p>Register here</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(evt) => handleEmailChange(evt)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(evt) => handlePasswordChange(evt)}
          />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
