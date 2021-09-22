import React, { useState, useEffect, useRef } from 'react'
import { Box, Text, HStack, VStack, Button, useDisclosure } from '@chakra-ui/react'
import Peer from 'peerjs'

import MobileMenu from '@features/dashboard/components/MobileMenu'

import history from '@globals/history'
import Layout from '@layout/SidebarLayout'
import Navbar from "@features/chat/components/Navbar"
import Sidebar from "@features/chat/components/Sidebar"
import CallScreen from '@features/call/components/CallScreen'
import usePeerStore from '@features/call/stores/peerStore'
import useSetupPeer from '@features/call/hooks/useSetupPeer'
import useUserStateStore from '@features/user/stores/stateStore'
import usePeerConnStore from '@features/call/stores/peerConnStore'


function HangupButton() {
  const peerConn = usePeerConnStore(state => state.peerConn)
  const setUserState = useUserStateStore(state => state.setUserState)

  return (
    <Button
      colorScheme="red"
      size="md"
      rounded="full"
      px="6"
      boxShadow="md"
      onClick={() => {
        setUserState('free')
        history.push("/")
        peerConn.close();
      }}
    >Hang Up</Button>
  )
}

function CallPage() {
  const [peer, setPeer] = useState(new Peer())
  const {isOpen, onToggle} = useDisclosure()

  const peerId = usePeerStore(state => state.peerId)
  const remoteAudio = useRef<null|HTMLAudioElement>(null)
  const localAudio = useRef<null|HTMLAudioElement>(null)
  const userState = useUserStateStore(state => state.userState)

  useSetupPeer({ peer, peerId, localAudio, remoteAudio })

  return (
    userState === "calling" ? (
      <Layout>
        <Layout.Navbar>
          <Navbar isOpen={isOpen} onToggle={onToggle} />
        </Layout.Navbar>
        <Layout.Sidebar>
          <Sidebar />
        </Layout.Sidebar>
        <Layout.Main>
          <Box h="full">
            <HStack
              h="10%"
              w="full"
              px={["12px", "48px"]}
              alignItems="center"
              jusitfyContent="flex-end"
            >
              <HangupButton />
            </HStack>
            <CallScreen localAudio={localAudio} remoteAudio={remoteAudio} />
            <audio ref={remoteAudio} muted></audio>
            <audio ref={localAudio} muted></audio>
          </Box>
          <Box
            display={[
              isOpen ? "block" : "none",
              isOpen ? "block" : "none",
              "none"
            ]}
            zIndex={1}
            h="full" w="full"
            position="absolute"
            top={12}
          >
            <MobileMenu />
          </Box>
        </Layout.Main>
      </Layout>
    ) : (
      <Layout>
        <Layout.Navbar>
          <Navbar isOpen={isOpen} onToggle={onToggle} />
        </Layout.Navbar>
        <Layout.Sidebar>
          <Sidebar />
        </Layout.Sidebar>
        <Layout.Main>
          <VStack justifyContent="center" w="full" h="full">
            <Text textAlign="center">You're not connected with anyone</Text>
          </VStack>
          <Box
            display={[
              isOpen ? "block" : "none",
              isOpen ? "block" : "none",
              "none"
            ]}
            zIndex={1}
            h="full" w="full"
            position="absolute"
            top={12}
          >
            <MobileMenu />
          </Box>
        </Layout.Main>
      </Layout>
    )
  )
}

export default CallPage