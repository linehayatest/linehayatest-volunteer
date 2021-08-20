import React from "react"
import { Button } from "@chakra-ui/react"
import useAcceptChatRequest from '@features/server/hooks/useAcceptChatRequest'
import useUserStateStore from "@features/user/stores/stateStore"


type AcceptButtonProps = {
  userId: number
}
function AcceptButton({ userId }: AcceptButtonProps) {
  const acceptChatRequest = useAcceptChatRequest()
  const setUserState = useUserStateStore(state => state.setUserState)

  const handleAcceptChatRequest = () => {
    acceptChatRequest(userId)
    setUserState('chatting')
  }

  return (
    <Button
      size="xs"
      colorScheme="whatsapp"
      onClick={handleAcceptChatRequest}
    >
      Accept
    </Button>
  )
}

export default AcceptButton