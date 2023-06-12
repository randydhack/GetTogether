import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setArrow] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    if (arrow) return;
    setShowMenu(true);
    setArrow(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setArrow(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();

    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <i
          className="fas fa-user-circle fa-2xl"
          style={{ color: "rgb(253, 74, 74)" }}
        />
        {arrow ? (
          <i
            className="fa-solid fa-angle-down fa-2xl arrow-icon"
            style={{ color: "#a8a8a8" }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-angle-up fa-2xl arrow-icon"
            style={{ color: "#a8a8a8" }}
          ></i>
        )}
      </button>

      <div className="profile-options-container">
        <div className={ulClassName} ref={ulRef}>
          <p>Hello, {user.username}</p>
          <p className="users-email">{user.email}</p>
          <p>
            <Link to="/groups">View Groups</Link>
          </p>
          <p>
            <Link to="/events">View Events</Link>
          </p>
          <div className="logout-button">
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
