import { useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"

import useSetupWebSocket from "./useSetupWebSocket"
import useLogin from "./useLogin"
import axios from "axios"
import useUserStateStore from "@features/user/stores/stateStore"
import useWebSocketStore from "../stores/webSocketStore"
import ReadyState from "../models/readyState"
import { REST_URL } from "@globals/urls"
import useResetUser from "@features/user/hooks/useResetUserState"
import useReconnect from "./useReconnect"


// useInitServer initializes WebSocket connection based on these conditions:
// 1. If last chat session is still active, check with server if can reconnect
// 2. If yes, Initialize WebSocket connection and send a Reconnect Request
// 3. If no, check with server if user already login through another device or tab
// 4. If yes, block user and shows a message
// 5. If no, Initialize WebSocket connection and send a Login Request
function useInitServer() {
  const { isAuthenticated, user } = useAuth0()
  const setupWebSocket = useSetupWebSocket({onClose: () => {}, onMessage: () => {}})
  const login = useLogin()
  const reconnect = useReconnect()
  const [canLogin, setCanLogin] = useState(false)
  const [canReconnect, setCanReconnect] = useState(false)

  const userState = useUserStateStore(state => state.userState)
  const { readyState, sendMessage } = useWebSocketStore(state => (
    {
      readyState: state.readyState,
      sendMessage: state.sendMessage
    }))
  const email = user?.email
  const resetUser = useResetUser()
  useEffect(() => {
    // ask if can reconnect
    if (
      isAuthenticated && 
      email !== undefined && 
      email !== null && 
      userState === "chatting" && 
      readyState === ReadyState.CLOSED || readyState === ReadyState.CLOSING
    ) {
      axios.get(`${REST_URL}/can_volunteer_reconnect/${email}`)
        .then(data => {
          const { canReconnect } = data.data
          if (canReconnect) {
            setupWebSocket()
            setCanReconnect(true)
          } else {
            setCanReconnect(false)
            resetUser()
          }
        })
    // ask server can login or not
    } else if (isAuthenticated) {
      axios.get(`${REST_URL}/can_volunteer_login/${user?.email ?? ""}`)
        .then(data => {
          const { canLogin } = data.data
          if (canLogin) {
            setCanLogin(true)
            setupWebSocket()
          } else {
            setCanLogin(false)
          }
        })
    }
  }, [isAuthenticated, readyState, sendMessage, userState])

  useEffect(() => {
    if (readyState === ReadyState.OPEN && sendMessage !== null && isAuthenticated) {
      if (canReconnect) {
        reconnect()
      } else if (canLogin) {
        login()
      }
    }
  }, [readyState, sendMessage, isAuthenticated, canLogin, canReconnect])
}

export default useInitServer