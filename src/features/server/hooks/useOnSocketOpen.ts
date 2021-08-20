import { useEffect } from "react"

import ReadyState from "../models/readyState"
import useWebSocketStore from "../stores/webSocketStore"
import { useAuth0 } from "@auth0/auth0-react"

function useOnSocketOpenAndAuthenticated(onOpen: () => void) {
  const {readyState, sendMessage} = useWebSocketStore(state => ({
    readyState: state.readyState,
    sendMessage: state.sendMessage,
  }))
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    if (readyState === ReadyState.OPEN && sendMessage !== null && isAuthenticated) {
      onOpen()
    }
  }, [readyState, sendMessage, isAuthenticated])
}

export default useOnSocketOpenAndAuthenticated