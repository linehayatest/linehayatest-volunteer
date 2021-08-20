import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"

import useUserStateStore from "@features/user/stores/stateStore"
import { REST_URL } from "@globals/urls"
import axios from "axios"
import useWebSocketStore from "../stores/webSocketStore"

import { ReconnectRequest } from "@features/server/models/requests"

function useReconnect() {
  const { user } = useAuth0()
  const sendMessage = useWebSocketStore(state => state.sendMessage)

  return () => {
    if (user?.email === undefined || user?.email === null) {
      throw("Unable to reconnect. user undefined or null")
    } else {
      const req: ReconnectRequest = {
        type: 3,
        metadata: {
          type: 'volunteer',
          identity: user.email,
        }
      }

      if (sendMessage === null) {
        throw("Unable to reconnect. sendMessage is null")
      }
      sendMessage(req)
    }
  }
}

export default useReconnect