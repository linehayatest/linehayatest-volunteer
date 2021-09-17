import useUserStateStore from "../stores/stateStore";
import useChatStore from "@features/chat/stores/chatStore";
import useReceivingStatusStore from "@features/chat/stores/receivingStatusStore"
import usePeerStore from "@features/call/stores/peerStore";

function useResetUser() {
  const setUserState = useUserStateStore(state => state.setUserState)
  const clearChats = useChatStore(state => state.clearChats)
  const setIsOnline = useReceivingStatusStore(state => state.setIsOnline)
  const setIsPeerConnected = usePeerStore(state => state.setIsPeerConnected)

  return () => {
    setUserState("free")
    clearChats()
    setIsOnline(true)
    setIsPeerConnected(false)
  }
}

export default useResetUser