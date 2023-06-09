import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./SignupFormModal.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Password must match",
    });
  };

  let disableSignup;

  if (
    !firstName.length ||
    !lastName.length ||
    username.length < 4 ||
    password.length < 6 ||
    password !== confirmPassword
  ) {
    disableSignup = "disable-sign-up";
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-up-container">
        <h1>Sign Up</h1>
        {errors.uniqueEmail && (
          <p className="sign-up-errors">{errors.uniqueEmail}</p>
        )}
        {errors.uniqueUsername && (
          <p className="sign-up-errors">{errors.uniqueUsername}</p>
        )}
        {errors.email && <p className="sign-up-errors">{errors.email}</p>}
        {errors.username && <p className="sign-up-errors">{errors.username}</p>}
        {errors.firstName && (
          <p className="sign-up-errors">{errors.firstName}</p>
        )}
        {errors.lastName && <p className="sign-up-errors">{errors.lastName}</p>}
        {errors.password && <p className="sign-up-errors">{errors.password}</p>}
        {errors.confirmPassword && (
          <p className="sign-up-errors">{errors.confirmPassword}</p>
        )}
        <label>
          <p className="sign-up-input-title">Email</p>
          <input
            className="input-field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <p className="sign-up-input-title">Username</p>
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <p className="sign-up-input-title">First Name</p>
          <input
            className="input-field"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <p className="sign-up-input-title">Last Name</p>
          <input
            className="input-field"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <p className="sign-up-input-title">Password</p>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <p className="sign-up-input-title">Confirm Password</p>
          <input
            className="input-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className={`${(disableSignup || "sign-up-submit")} sign-up-confirm`}>Sign Up</button>
      </form>
    </>
  );
}
export default SignupForm;
