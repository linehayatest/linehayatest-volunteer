import React, { useEffect } from 'react'
import { useToast } from '@chakra-ui/toast'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import Peer from 'peerjs'

import history from '@globals/history'
import { REST_URL } from '@globals/urls'
import useUserStateStore from '@features/user/stores/stateStore'
import usePeerStore from '../stores/peerStore'
import usePeerConnStore from '../stores/peerConnStore'

type useSetupPeerProps = {
  peer: Peer,
  peerId: string,
  localAudio: React.MutableRefObject<null|HTMLAudioElement>,
  remoteAudio: React.MutableRefObject<null|HTMLAudioElement>,
}
function useSetupPeer({
  peer,
  peerId,
  localAudio,
  remoteAudio
}: useSetupPeerProps) {

  const setIsPeerConnected = usePeerStore(state => state.setIsPeerConnected)
  const setUserState = useUserStateStore(state => state.setUserState)
  const setPeerConn = usePeerConnStore(state => state.setPeerConn)
  const { user } = useAuth0()
  const toast = useToast()

  useEffect(() => {
    peer.on('open', function() {
      peer.connect(peerId)
      const constraints = {video: false, audio: true}
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const call = peer.call(peerId, stream)
          setPeerConn(call)
          call.peerConnection.oniceconnectionstatechange = function() {
            if (call.peerConnection.iceConnectionState === 'disconnected') {
              setIsPeerConnected(false)
              setUserState('free')
              axios.put(`${REST_URL}/hang_up/${user.email}`)
                .then(data => {
                  history.push('/')
                })
              toast({
                description: "Student has hanged up",
                status: "error"
              })
              call.close()
            }
          }

          if (localAudio.current !== null) {
            localAudio.current.srcObject = stream
            localAudio.current.autoplay = false
          }
          // set the stream on global state
          call.on('stream', function(remoteStream) {
            localAudio.current.muted = true
            remoteAudio.current.muted = false
            remoteAudio.current.srcObject = remoteStream
            remoteAudio.current.autoplay = true
            setIsPeerConnected(true)
          })
      })
    })
    peer.on('error', err => console.error(err))
  }, [])
}

export default useSetupPeer