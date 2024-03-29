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
      className="myAccount__form myAccount__form--register formWrapper">
      <h2>Register an account to start setting goals </h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="registrationFormNameInput">Name</label>
          <input
            type="text"
            name="name"
            id="registrationFormNameInput"
            placeholder="Enter name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <span className="separator"> </span>
        </div>
        <div className="form-control">
          <label htmlFor="registrationFormEmailInput">Email</label>
          <input
            type="email"
            name="email"
            id="registrationFormEmailInput"
            placeholder="Enter email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <span className="separator"> </span>
        </div>
        <div className="form-control">
          <label htmlFor="registrationFormPasswordInput">Password</label>
          <input
            type="password"
            name="password"
            id="registrationFormPasswordInput"
            placeholder="Enter password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <span className="separator"> </span>
        </div>
        <div className="form-control">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
