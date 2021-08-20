import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Auth0Provider, useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { BASE_URL, SOCKET_URL, REST_URL } from "@globals/urls"
import history from "@globals/history"

import "@pages/App/styles.css"
import DashboardPage from "@pages/Dashboard";
import ChatPage from "@pages/Chat";
import useHandleEvents from "@features/server/hooks/useHandleEvents";
import useRedirectToChat from "@features/chat/hooks/useRedirectToChat";

import useInitServer from "@features/server/hooks/useInitServer";
import useWebSocketStore from "@features/server/stores/webSocketStore";
import ReadyState from "@features/server/models/readyState";

const onRedirectCallback = (appState: any) => {
  console.log(appState)
}

const RoutesWithAuthentication = withAuthenticationRequired(() => {
  const readyState = useWebSocketStore(state => state.readyState)

  useInitServer()

  // if user is chatting, redirect to Chat page
  useRedirectToChat()
  useHandleEvents()

  return (
      readyState === ReadyState.OPEN ? (
        <Switch>
          <Route path="/chat">
            <ChatPage />
          </Route>
          <Route path="/">
            <DashboardPage />
          </Route>
        </Switch>
      ) : (
        <Box>
          <Text>You have another instance open.</Text>
        </Box>
      )
    )
})

const Lol = withAuthenticationRequired(() => <Text>You're fucked</Text>)

export default function App() {

  return (
    <Auth0Provider
      domain="dev-9ppbtkut.jp.auth0.com"
      clientId="XdlINJ4tuvGX6jPeiAIfFMkuz5qDDNuI"
      redirectUri={`${BASE_URL}`}
      onRedirectCallback={onRedirectCallback}
    >
      <Router history={history}>
        <RoutesWithAuthentication />
      </Router>
    </Auth0Provider>
    
  );
}

