import React, { useEffect, useState } from "react";
import { Box, VStack, Text } from "@chakra-ui/layout";
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
import EndConversationPopup from "@features/server/components/EndConversationPopup";
import ReconnectPopup from "@features/server/components/ReconnectPopup";

const onRedirectCallback = (appState: any) => {
  console.log(appState)
}

const RoutesWithAuthentication = withAuthenticationRequired(() => {
  const readyState = useWebSocketStore(state => state.readyState)

  useInitServer()

  // if user is chatting, redirect to Chat page
  useHandleEvents()

  return (
      readyState === ReadyState.OPEN ? (
        <>
          <ReconnectPopup />
          <EndConversationPopup />
          <Switch>
            <Route path="/chat">
              <ChatPage />
            </Route>
            <Route path="/">
              <DashboardPage />
            </Route>
          </Switch>
        </>
      ) : (
        <VStack w="100vw" h="100vh" justifyContent="center" textAlign="center">
          <Text mb="2" fontWeight="500" fontSize="20px">You have another instance open.</Text>

          <Text mb="4">Wait for 1 ~ 2 seconds, if this text is still present. It may be that:</Text>

          <Text mb="2" textDecoration="underline">Why am I seeing this?</Text>
          <Text>We detected that you have another tab / device / browser opening the website with the same volunteer account.</Text>
          <Text mb="4">Due to technical restrictions, only once tab / device / browser is allowed to access the website with the same account.</Text>

          <Text textDecoration="underline">What you can do:</Text>
          <Text>Close other tabs and leave only one one tab accessing the website. Then try refresh the website.</Text>
        </VStack>
      )
    )
})

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

