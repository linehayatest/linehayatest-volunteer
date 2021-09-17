import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

import { REST_URL } from "@globals/urls"
import usePeerStore from "../stores/peerStore"
import history from "@globals/history"

function useAcceptCallRequest() {
  const { user } = useAuth0()
  const setPeerId = usePeerStore(state => state.setPeerId)

  return (userId: number) => {
    if (user?.email === undefined || user?.email === null) {
      throw("Unable to login. user undefined or null")
    } else {
      axios.put(`${REST_URL}/volunteer_accept_call/${user.email}/${userId}`)
        .then(data => {
          setPeerId(data.data['peer_id'])
          history.push("/call")
        })
    }
  }
}

export default useAcceptCallRequest