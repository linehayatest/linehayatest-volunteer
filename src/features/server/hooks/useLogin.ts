import { useAuth0 } from "@auth0/auth0-react";
import { LoginRequest } from "../models/requests";
import useWebSocketStore from "../stores/webSocketStore";

function useLogin() {
  const { user } = useAuth0()
  const sendMessage = useWebSocketStore(state => state.sendMessage)

  return () => {
    if (user?.email === undefined || user?.email === null) {
      throw("Unable to login. user undefined or null")
    } else {
      const req: LoginRequest = {
        type: 2,
        metadata: {
          type: 'volunteer',
          identity: user.email,
        }
      }

      if (sendMessage === null) {
        throw("Unable to login. sendMessage is null")
      }
      sendMessage(req)
    }
  }
}

export default useLogin