import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../../firebase";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    registerWithEmailAndPassword(name, email, password);
  }

  return (
    <div
      data-testid="registerComponentTestElement"
      className="myAccount__form myAccount__form--register">
      <p>First time here? Register an account to start setting goals! </p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholer="Enter email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
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
