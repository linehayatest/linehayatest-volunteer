import { useEffect } from 'react'

import useUserStateStore from '@features/user/stores/stateStore'
import usePeerStore from '../stores/peerStore'

function useResetCallState() {
  const { userState, setUserState } = useUserStateStore(state => ({
    userState: state.userState,
    setUserState: state.setUserState,
  }))
  const setIsPeerConnected = usePeerStore(state => state.setIsPeerConnected)

  useEffect(() => {
    if (userState === 'calling') {
      setUserState('free')
      setIsPeerConnected(false)    
    }
  }, [])
}

export default useResetCallState