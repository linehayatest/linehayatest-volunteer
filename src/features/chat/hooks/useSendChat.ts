import useWebSocketStore from "@features/connection/stores/webSocketStore"
import { ACTION } from "../models/requests"
import useChatStore from "../stores/chatStore"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { SOCKET_URL } from "@globals/urls"

function useSendChat() {
  const addChat = useChatStore(state => state.addChat)
  const { sendJsonMessage } = useWebSocket(SOCKET_URL, {share: true})

  return (message: string) => {
    addChat({
      fromSelf: true,
      message: message,
      time: new Date(),
    })

    const msg = {
      type: ACTION.SEND_MESSAGE,
      payload: { message }
    }

    sendJsonMessage(msg)
  }
}

export default useSendChat

