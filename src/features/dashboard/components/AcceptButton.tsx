import React from "react"
import { Button } from "@chakra-ui/react"
import useAcceptChatRequest from '@features/server/hooks/useAcceptChatRequest'
import useUserStateStore from "@features/user/stores/stateStore"
import useAcceptCallRequest from "@features/call/hooks/useAcceptCallRequest"


type AcceptButtonProps = {
  userId: number,
  type: 'wait-call' | 'wait',
}
function AcceptButton({ userId, type }: AcceptButtonProps) {
  const acceptChatRequest = useAcceptChatRequest()
  const acceptCallRequest = useAcceptCallRequest()
  const { userState, setUserState } = useUserStateStore(state => ({
    userState: state.userState,
    setUserState: state.setUserState,
  }))

  const handleAcceptClick = () => {
    if (type === 'wait') {
      acceptChatRequest(userId)
      setUserState('chatting')
      return
    }
    setUserState('calling')
    acceptCallRequest(userId)
  }

  return (
    <Button
      size="xs"
      colorScheme="whatsapp"
      onClick={handleAcceptClick}
      disabled={userState === "chatting"}
    >
      Accept
    </Button>
  )
}

export default AcceptButton