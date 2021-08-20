import { useAuth0 } from "@auth0/auth0-react"
import { AcceptChatRequest, REQUESTS } from "../models/requests";
import useWebSocketStore from "../stores/webSocketStore";


function useAcceptChatRequest() {
  const sendMessage = useWebSocketStore(state => state.sendMessage)
  const { user } = useAuth0()

  return (userId: number) => {
    if (user?.email === undefined || user?.email === null) {
      throw("Unable to login. user undefined or null")
    } else {
      const req: AcceptChatRequest = {
        type: 1,
        metadata: {
          type: 'volunteer',
          identity: user.email,
        },
        payload: {
          userId
        }
      }

      if (sendMessage === null) {
        throw("Unable to login. sendMessage is null")
      }
      sendMessage(req)
    }
  }
}

export default useAcceptChatRequest