import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { useHistory, Redirect } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) <Redirect to='/'/>

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();

        if (data) setErrors(data);
      }
    );
  };

  const demoUser = (e) => {
    e.preventDefault();

    history.push("/");

    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    )
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-container">
        <h1 className="login-title">Log In</h1>
        {errors.message &&
          <div className="validation-error-message">{errors.message}</div>}
        <label>
          <input
            className="input-field"
            placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="input-field"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-box-button">
          <button type="submit" className="login-button" disabled={credential.length < 4 || password.length < 6}>
            Log In
          </button>
          <button className="demo-user-button" onClick={demoUser}>
            Demo User
          </button>
        </div>
      </form>
    </>
  );
}
export default LoginForm;
