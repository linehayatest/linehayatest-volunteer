import React, { useEffect } from "react"
import { Box, Text, HStack } from "@chakra-ui/react"

import useRequestChat from "@features/chat/hooks/useRequestChat"
import useWebSocketStore from "@features/connection/stores/webSocketStore"
import { Event, EVENT, ChatMessageEvent } from "@features/chat/models/responses"
import MainChat from "@features/volunteer/containers/MainChat"
import useChatStore from "@features/chat/stores/chatStore"
import useStudentStateStore from "@features/chat/stores/userStateStore"

const patternStyle = {
  bgColor: "#f7fafc",
  bgImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23cbd5e0' fill-opacity='0.4' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E")`,
}

function useAbortChatRequest() {
  const { studentState, setStudentState } = useStudentStateStore(state => ({
    studentState: state.studentState,
    setStudentState: state.setStudentState,
  }))

  useEffect(() => {
    window.addEventListener("beforeunload", function() {
      if (studentState === 'waiting') {
        setStudentState('idling')
      }
    })
  }, [])
}

function ChatContent() {
  const studentState = useStudentStateStore(state => state.studentState)

  switch (studentState) {
    case 'chatting': {
      return (
        <MainChat isOpen={false} />
      )
    }
    case 'waiting': {
      return (
        <HStack h={40} justifyContent="center" px="4">
          <Text textAlign="center">You have come to the chat page. Please wait while our team pick up your request.</Text>
        </HStack>
      )
    }
    case 'idling': {
      return (
        <HStack h={40} justifyContent="center" px="4">
          <Text textAlign="center">
            You are not requesting to chat or chatting with anyone.
          </Text>
        </HStack>
      )
    }
  }
}

function Chat() {
  const lastJsonMessage = useWebSocketStore(state => state.lastJsonMessage)
  const { chats, addChat } = useChatStore(state => ({
    chats: state.chats,
    addChat: state.addChat,
  }))
  const setStudentState = useStudentStateStore(state => state.setStudentState)

  // TODO: Call useRegisterVolunter or other function
  // TODO: To set the lastJSONMessage & sendJsonMessage of useWeboskcetStore
  useAbortChatRequest()
  useRequestChat()


  useEffect(() => {
    if (lastJsonMessage === null || lastJsonMessage === undefined || Object.keys(lastJsonMessage).length === 0) {
      return
    }

    console.log(lastJsonMessage)

    switch ((lastJsonMessage as Event).type) {
      case EVENT.CHAT_REQUEST_ACCEPTED: {
        // direct to chat component
        setStudentState('chatting')
        break;
      }
      case EVENT.CHAT_MESSAGE: {
        // add message to message store
        const { message } = lastJsonMessage as ChatMessageEvent
        addChat({
          message: message,
          fromSelf: false,
          time: new Date()
        })
        break;
      }
      default: {
        console.warn("UNRECOGNIZED MESSAGE TYPE")
      }
      // handle party update
    }
  }, [lastJsonMessage])

  return (
    <>
      <ChatContent />
    </>
  )
}

export default Chat