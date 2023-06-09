import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
        <SignupFormModal />
      </div>
    );
  }

  return (
    <div className="session-links">
      <div>
        <NavLink exact to="/" className="home-button">
          gatherUp
        </NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
