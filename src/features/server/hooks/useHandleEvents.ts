import { useEffect } from "react";
import { ChatEvent, EVENTS, ServerEvent } from "../models/events";
import useWebSocketStore from "../stores/webSocketStore";
import useChatStore from "@features/chat/stores/chatStore";
import useUserStateStore from "@features/user/stores/stateStore";
import useDashboardStore, { DashboardUpdateEvent } from "@features/dashboard/stores/dashboardStore";
import { useToast } from "@chakra-ui/react";

function useHandleEvents() {
  const lastMessage = useWebSocketStore(state => state.lastMessage)
  const setUserState = useUserStateStore(state => state.setUserState)
  const addChat = useChatStore(state => state.addChat)
  const { setVolunteers, setStudents } = useDashboardStore(state => ({
    setVolunteers: state.setVolunteers,
    setStudents: state.setStudents,
  }))
  const toast = useToast()


  useEffect(() => {
    const type = lastMessage.type as ServerEvent
    
    switch (type) {
      case EVENTS.DASHBOARD_STATUS_UPDATE: {
        const { volunteers, students } = lastMessage as DashboardUpdateEvent
        setVolunteers(volunteers)
        setStudents(students)
        break;
      }
      case EVENTS.CHAT_MESSAGE: {
        const { message } = lastMessage as ChatEvent
        addChat({
          time: new Date(),
          fromSelf: false,
          message
        })
        break;
      };
      case EVENTS.PARTY_HAS_DISCONNECT: {
        toast({
          description: "Student has suddenly disconnect",
          status: "error",
        })
        break;
      }
      case EVENTS.PARTY_HAS_RECONNECT: {
        toast({
          description: "Student is back online",
          status: "success",
        })
        break;
      }
    }
  }, [lastMessage])
}

export default useHandleEvents