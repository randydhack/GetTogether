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
import CreateGroupForm from "./components/GroupsPage/CreateGroupForm";
import CreateEventForm from "./components/EventsPage/CreateEventForm";
import UpdateGroup from "./components/GroupsPage/UpdateGroup";

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
            <Route path="/login" component={LoginFormPage}/>
            <Route path="/signup" component={SignupFormPage}/>
            <Route path='/group/new' component={CreateGroupForm}/>
            <Route exact path="/groups/:groupId" component={GroupDetails}/>
            <Route path="/groups" component={GroupsPage}/>
            <Route path="/group/:groupId/edit" component={UpdateGroup}/>
            <Route path='/group/:groupId/events/new' component={CreateEventForm}/>
            <Route exact path="/events/:eventId" component={EventDetails}/>
            <Route path="/events" component={EventsPage}/>
          </Switch>
      )}
    </>
  );
}

export default App;
