import { useEffect } from "react"

import useUserStateStore from "@features/user/stores/stateStore"
import { useLocation } from "react-router-dom"
import history from "@globals/history"

function useRedirectToChat() {
  const userState = useUserStateStore(state => state.userState)
  const path = useLocation()

  useEffect(() => {
    if (userState === "chatting" && path.pathname !== "/chat") {
      history.push('/chat')
    }
  }, [userState])
}

export default useRedirectToChat
