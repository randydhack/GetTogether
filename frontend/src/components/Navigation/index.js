import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  //   const dispatch = useDispatch();

  //   const logout = (e) => {
  //     e.preventDefault();
  //     dispatch(sessionActions.logout());
  //   };

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = <div className='start-group-profile-button'>
      <NavLink className='start-group' to='/group/new'>Start a new group</NavLink>
      <ProfileButton user={sessionUser} />
    </div>
  } else {
    sessionLinks = (
      <div className="top-right-nav-links">
        <LoginFormModal />
        <NavLink
          to="/signup"
          className="sign-up-button"
          style={{ color: "black", marginRight: "10px" }}
        >
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <div className="session-links">
      <div>
        <NavLink exact to="/" className="home-button">
          GatherUp
        </NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
