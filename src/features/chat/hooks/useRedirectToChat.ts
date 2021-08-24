import { useEffect } from "react"

import useUserStateStore from "@features/user/stores/stateStore"
import { useLocation } from "react-router-dom"
import history from "@globals/history"

// fix the case whereby when student end conversation while volunteer is disconnected
// it will show 'you are still chatting'
// Expected Behaviour, it will show modal 'Last session terminated' instead

// TODO: Show a modal saying you are still chatting, on OK click, redirect to Chat page
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
