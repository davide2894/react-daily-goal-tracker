import React, { useState } from "react";
import { loginWithEmailAndPassword } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    loginWithEmailAndPassword(email, password);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div
      data-testid="loginComponentTest"
      className="hi myAccount__form myAccount__form--login form">
      <p>Login if you have already an account</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label for="loginFormEmailInput">Email</label>
          <input
            type="email"
            name="email"
            id="loginFormEmailInput"
            value={email}
            onChange={(evt) => handleEmailChange(evt)}
          />
        </div>
        <div className="form-control">
          <label for="loginFormPassword">Password</label>
          <input
            type="password"
            name="password"
            id="loginFormPassword"
            value={password}
            onChange={(evt) => handlePasswordChange(evt)}
          />
        </div>
        <div className="form-control">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
