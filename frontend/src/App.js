import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import GroupsPage from "./components/GroupsPage/index";
import GroupDetails from "./components/GroupsPage/GroupDetails";
import EventsPage from "./components/EventsPage";
import EventDetails from "./components/EventsPage/EventDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
            <Route path="/login" component={LoginFormPage}></Route>
            <Route path="/signup" component={SignupFormPage}></Route>
            <Route exact path="/groups/:groupId" component={GroupDetails}></Route>
            <Route path="/groups" component={GroupsPage}></Route>
            <Route exact path="/events/:eventId" component={EventDetails}></Route>
            <Route path="/events" component={EventsPage}></Route>
          </Switch>
      )}
    </>
  );
}

export default App;
