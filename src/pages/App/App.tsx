import React from "react";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { createBrowserHistory } from 'history'
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Chat from "../volunteer/Chat"
import Dashboard from "../volunteer/Dashboard"
import { BASE_URL } from "../../urls"

const history = createBrowserHistory();

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
        <div>
          <Switch>
            <Route path="/about">
              <ProtectedAbout></ProtectedAbout>
            </Route>
            <Route path="/volunteer/chat">
              <Chat />
            </Route>
            <Route path="/volunteer">
              <Dashboard />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Auth0Provider>
    
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

const ProtectedAbout = withAuthenticationRequired(About)

function Users() {
  return <h2>Users</h2>;
}