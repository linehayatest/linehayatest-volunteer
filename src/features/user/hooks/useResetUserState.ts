import useUserStateStore from "../stores/stateStore";
import useChatStore from "@features/chat/stores/chatStore";
import useReceivingStatusStore from "@features/chat/stores/receivingStatusStore"

function useResetUser() {
  const setUserState = useUserStateStore(state => state.setUserState)
  const clearChats = useChatStore(state => state.clearChats)
  const setIsOnline = useReceivingStatusStore(state => state.setIsOnline)

  return () => {
    setUserState("free")
    clearChats()
    setIsOnline(true)
  }
}

export default useResetUser