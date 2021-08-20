import useUserStateStore from "../stores/stateStore";

function useResetUser() {
  const setUserState = useUserStateStore(state => state.setUserState)

  return () => {
    setUserState("free")
  }
}

export default useResetUser