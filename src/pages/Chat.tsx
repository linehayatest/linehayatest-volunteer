import React from "react"
import { HStack, Text } from "@chakra-ui/react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import Chat from "@features/chat/containers/Chat"

function ChatPage() {
  return (
    <Chat />
  )
}

export default withAuthenticationRequired(ChatPage)