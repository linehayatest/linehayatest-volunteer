import { useAuth0 } from "@auth0/auth0-react";
import { EndConversationRequest } from "../models/requests";
import useWebSocketStore from "../stores/webSocketStore";

function useEndConversation() {
  const sendMessage = useWebSocketStore(state => state.sendMessage)
  const { user } = useAuth0()

  return () => {
    if (!user?.email) {
      throw("Unable to send chat message. User's email is not defined")
    }
    
    const message: EndConversationRequest = {
      metadata: {
        identity: user?.email,
        type: 'volunteer'
      },
      type: 7,
    }

    if (sendMessage === null) {
      throw("Unable to send chat message. sendMessage is null")
    }

    sendMessage(message)
  }
}

export default useEndConversation