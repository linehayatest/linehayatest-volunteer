import { ACTION } from "@features/chat/models/requests"
import useWebSocketStore from "@features/connection/stores/webSocketStore";
import history from "@globals/history"

function useAcceptChatRequest() {
  const sendJsonMessage = useWebSocketStore(state => state.sendJsonMessage)
  
  return (userId: number) => {
    sendJsonMessage({
      type: ACTION.VOLUNTEER_ACCEPT_CHAT_REQUEST,
      payload: {
        userId: userId
      }
    })
    history.push("/volunteer/chat")
  }
}

export default useAcceptChatRequest