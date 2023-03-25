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
      className="hi myAccount__form myAccount__form--login">
      <p>Login if you have already an account</p>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
