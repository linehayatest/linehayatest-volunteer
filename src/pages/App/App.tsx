import React from "react";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import StudentChat from "@pages/chat/Chat"
import VolunteerChat from "@pages/volunteer/Chat"
import Dashboard from "@pages/volunteer/Dashboard"
import Home from "@pages/Home"
import { BASE_URL } from "@globals/urls"
import history from "@globals/history"

import "@pages/App/styles.css"
import useStudentStateStore from "@features/chat/stores/userStateStore";


const onRedirectCallback = (appState: any) => {
  console.log(appState)
}



export default function App() {
  return (
    <Auth0Provider
      domain="dev-9ppbtkut.jp.auth0.com"
      clientId="XdlINJ4tuvGX6jPeiAIfFMkuz5qDDNuI"
      redirectUri={`${BASE_URL}/volunteer/dashboard`}
      onRedirectCallback={onRedirectCallback}
    >
      <Router history={history}>
        <Switch>
          <Route path="/about">
            <ProtectedAbout></ProtectedAbout>
          </Route>
          <Route path="/volunteer/chat">
            <VolunteerChat />
          </Route>
          <Route path="/volunteer">
            <Dashboard />
          </Route>
          <Route path="/chat">
            <StudentChat />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Auth0Provider>
    
  );
}

function About() {
  return <h2>About</h2>;
}

const ProtectedAbout = withAuthenticationRequired(About)
