import React, { useState, useRef } from 'react'
import { Input, IconButton, Button } from "@chakra-ui/react"
import { Grid, GridItem, VStack, HStack, Box, Text } from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/hooks'

import Layout from "@layout/SidebarLayout"
import Navbar from "@features/chat/components/Navbar"
import Sidebar from "@features/chat/components/Sidebar"
import MobileMenu from '@features/dashboard/components/MobileMenu'
import useChatStore from '../stores/chatStore'

import { MdSend } from "react-icons/md";
import useSendChat from '@features/server/hooks/useSendChat'
import useEndConversation from '@features/server/hooks/useEndConversation'
import useUserStateStore from '@features/user/stores/stateStore'
import history from '@globals/history'
import useResetUser from '@features/user/hooks/useResetUserState'

import ChatArea from '../components/Chat'


const patternStyle = {
  bgColor: "#f7fafc",
  bgImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23cbd5e0' fill-opacity='0.4' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E")`,
}

function Chat() {
  const {isOpen, onToggle} = useDisclosure()
  const {chats, addChat} = useChatStore(state => ({
    chats: state.chats,
    addChat: state.addChat
  }))
  const [text, setText] = useState("")
  const inputRef = useRef<null|HTMLInputElement>(null)
  const sendChat = useSendChat()
  const endConversation = useEndConversation()
  const { userState, setUserState } = useUserStateStore(state => ({
    userState: state.userState,
    setUserState: state.setUserState,
  }))
  const resetUser = useResetUser()

  const handleSendChat = () => {
    if (inputRef.current !== null) {
      inputRef.current.value = ''
    }
    addChat({
      fromSelf: true,
      message: text,
      time: new Date()
    })
    sendChat(text)
    setText('')
  }

  const handleEndConversation = () => {
    resetUser()
    endConversation()
    history.push("/")
  }

  return (
    userState === "chatting" ? (
      <Layout>
        <Layout.Navbar>
          <Navbar isOpen={isOpen} onToggle={onToggle} />
        </Layout.Navbar>
        <Layout.Sidebar>
          <Sidebar />
        </Layout.Sidebar>
        <Layout.Main>
          <ChatArea />
        </Layout.Main>
      </Layout>
    ) : (
      <Layout>
        <Layout.Navbar>
          <Navbar isOpen={isOpen} onToggle={onToggle} />
        </Layout.Navbar>
        <Layout.Sidebar>
          <Sidebar />
        </Layout.Sidebar>
        <Layout.Main>
          <VStack justifyContent="center" w="full" h="full">
            <Text textAlign="center">You're not connected with anyone</Text>
          </VStack>
        </Layout.Main>
      </Layout>
    )
  )
}

export default Chat