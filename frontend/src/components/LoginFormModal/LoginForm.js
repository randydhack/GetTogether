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

  let disableLogin;

  if (credential.length < 4 || password.length < 6) disableLogin = 'disableLogin'

  return (
    <>
      <form onSubmit={handleSubmit} className="login-container">
        <h1 className="login-title">Log In</h1>
        {errors.message &&
          <div className="validation-error-message">{errors.message}</div>}
        <label>
          <p className="login-input-title">Username or Email</p>
          <input
            className="input-field"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <p className="login-input-title">Password</p>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-box-button">
          <button type="submit" className={disableLogin || 'login-button'}>
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
