import React from "react"
import { Button } from "@chakra-ui/react"
import useAcceptChatRequest from "@features/volunteer/hooks/useAcceptChatRequest"

type AcceptButtonProps = {
  userId: number
}
function AcceptButton({ userId }: AcceptButtonProps) {
  const acceptChat = useAcceptChatRequest()

  return (
    <Button
      size="xs"
      colorScheme="whatsapp"
      onClick={() => acceptChat(userId)}
    >
      Accept
    </Button>
  )
}

export default AcceptButton