import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
//   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <div className='top-right-nav-links'>
        <NavLink to="/login" className='log-in-button' style={{color: 'black', marginRight: '30px'}}>Log In</NavLink>
        <NavLink to="/signup" className='sign-up-button' style={{color: 'black', marginRight: '10px'}}>Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className='session-links'>
      <div>
        <NavLink exact to="/" className='home-button'>GatherUp</NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
