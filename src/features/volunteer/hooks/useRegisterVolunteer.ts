import { useEffect } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { SOCKET_URL } from "@globals/urls";
import { ACTION } from "@features/chat/models/requests"
import useWebSocketStore from "@features/connection/stores/webSocketStore";
import useVolunteerStateStore from "../stores/volunteerStateStore";
import { useAuth0 } from "@auth0/auth0-react";

function useRegisterVolunteer() {
  const wsStore = useWebSocketStore(state => ({
    sendJsonMessage: state.sendJsonMessage,
    setSendJsonMessage: state.setSendJsonMessage,
    setLastJsonMessage: state.setLastJsonMessage,
    setReadyState: state.setReadyState,
    setGetWebSocket: state.setGetWebSocket
  }))

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(SOCKET_URL);

  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    wsStore.setReadyState(readyState)

    if (readyState === ReadyState.OPEN && isAuthenticated && user !== undefined) {
      wsStore.setSendJsonMessage(sendJsonMessage)
      wsStore.setGetWebSocket(getWebSocket)

      sendJsonMessage({
        type: ACTION.VOLUNTEER_LOGIN,
        payload: {
          email: user.email
        }
      })
    }
  }, [readyState])

  useEffect(() => {
    wsStore.setLastJsonMessage(lastJsonMessage)
  }, [lastJsonMessage])
}

export default useRegisterVolunteer