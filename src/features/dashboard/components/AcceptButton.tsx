import React from "react"
import { Button } from "@chakra-ui/react"
import useAcceptChatRequest from '@features/server/hooks/useAcceptChatRequest'
import useUserStateStore from "@features/user/stores/stateStore"
import history from "@globals/history"


type AcceptButtonProps = {
  userId: number
}
function AcceptButton({ userId }: AcceptButtonProps) {
  const acceptChatRequest = useAcceptChatRequest()
  const { userState, setUserState } = useUserStateStore(state => ({
    userState: state.userState,
    setUserState: state.setUserState,
  }))

  const handleAcceptChatRequest = () => {
    acceptChatRequest(userId)
    setUserState('chatting')
    history.push("/chat")
  }

  return (
    <Button
      size="xs"
      colorScheme="whatsapp"
      onClick={handleAcceptChatRequest}
      disabled={userState === "chatting"}
    >
      Accept
    </Button>
  )
}

export default AcceptButton