import { useEffect } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { SOCKET_URL } from "@globals/urls";
import { ACTION } from "@features/chat/models/requests"
import useWebSocketStore from "@features/connection/stores/webSocketStore";
import useStudentStateStore from "../stores/userStateStore";

// must be called before using store
function useRequestChat() {
  const wsStore = useWebSocketStore(state => ({
    sendJsonMessage: state.sendJsonMessage,
    setSendMessage: state.setSendMessage,
    setSendJsonMessage: state.setSendJsonMessage,
    setLastJsonMessage: state.setLastJsonMessage,
    setReadyState: state.setReadyState,
    setGetWebSocket: state.setGetWebSocket
  }))

  const {
    sendMessage,
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(SOCKET_URL, {share: true});

  const studentState = useStudentStateStore(state => state.studentState)

  console.log(new Date())
  console.log("FROM WEBSOCKET ITSELF")
  console.log(lastJsonMessage)

  useEffect(() => {
    wsStore.setReadyState(readyState)

    if (readyState === ReadyState.OPEN && studentState === 'waiting') {
      wsStore.setSendJsonMessage(sendJsonMessage)
      wsStore.setGetWebSocket(getWebSocket)
      wsStore.setSendMessage(sendMessage)

      sendJsonMessage({
        type: ACTION.STUDENT_REQUEST_FOR_CHAT
      })
    }
  }, [readyState, sendJsonMessage, getWebSocket])

  useEffect(() => {
    wsStore.setLastJsonMessage(lastJsonMessage)
  }, [lastJsonMessage])

  

}

export default useRequestChat