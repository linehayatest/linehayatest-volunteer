import React, { useEffect, PropsWithChildren } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { withAuthenticationRequired } from "@auth0/auth0-react"

import Layout from "@layout/SidebarLayout"
import Navbar from "@features/volunteer/containers/Navbar"
import Sidebar from "@features/volunteer/containers/Sidebar"
import Main from "@features/volunteer/containers/Main"

import useRegisterVolunteer from '@features/volunteer/hooks/useRegisterVolunteer'
import useWebSocketStore from '@features/connection/stores/webSocketStore'
import useChatStore from '@features/chat/stores/chatStore'
import useDashboardStore, { DashboardUpdateEvent } from '@features/volunteer/stores/dashboardStore'
import { Event, EVENT, ChatMessageEvent } from "@features/chat/models/responses"

function Dashboard() {
  const {isOpen, onToggle} = useDisclosure()

  useRegisterVolunteer()

  const lastJsonMessage = useWebSocketStore(state => state.lastJsonMessage)
  const { chats, addChat } = useChatStore(state => ({
    chats: state.chats,
    addChat: state.addChat,
  }))

  const {
    setStudents,
    setVolunteers
  } = useDashboardStore(state => ({
    setStudents: state.setStudents,
    setVolunteers: state.setVolunteers,
  }))

  useEffect(() => {
    if (lastJsonMessage === null || lastJsonMessage === undefined || Object.keys(lastJsonMessage).length === 0) {
      return
    }

    switch((lastJsonMessage as Event).type) {
      case EVENT.DASHBOARD_STATUS_UPDATE: {
        const { volunteers, students } = (lastJsonMessage as DashboardUpdateEvent)
        setVolunteers(volunteers)
        setStudents(students)
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
        console.warn("Unrecognized message type")
      }
    }

  }, [lastJsonMessage])

  return (
    <Layout>
      <Layout.Navbar>
        <Navbar isOpen={isOpen} onToggle={onToggle} />
      </Layout.Navbar>
      <Layout.Sidebar>
        <Sidebar />
      </Layout.Sidebar>
      <Layout.Main>
        <Main isOpen={isOpen} />
      </Layout.Main>
    </Layout>
  )
}

// export default Dashboard
export default withAuthenticationRequired(Dashboard)