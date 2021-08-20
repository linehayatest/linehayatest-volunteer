import { useAuth0 } from "@auth0/auth0-react"

import { ChatMessage } from "../models/requests";
import useWebSocketStore from "../stores/webSocketStore";

function useSendChat() {
  const sendMessage = useWebSocketStore(state => state.sendMessage)
  const { user } = useAuth0()

  return (text: string) => {
    if (user?.email === undefined || user?.email === null) {
      throw("Unable to send chat message. User not defined")
    }
    
    const message: ChatMessage = {
      metadata: {
        type: 'volunteer',
        identity: user.email,
      },
      type: 6,
      payload: {
        message: text,
      }
    }

    if (sendMessage === null) {
      throw("Unable to send chat message. sendMessage is null")
    }

    sendMessage(message)
  }
}

export default useSendChat