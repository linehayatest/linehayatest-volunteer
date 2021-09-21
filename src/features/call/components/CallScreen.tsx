import React, { MutableRefObject, useState, useCallback } from 'react'
import { Text, HStack, Box, Button, VStack, Image, IconButton, Tooltip } from '@chakra-ui/react'
import { PhoneIcon } from "@chakra-ui/icons";
import { FaMicrophone } from 'react-icons/all'

import logo from '@resources/images/LineHayat-WhiteBackground.svg'
import usePeerStore from '../stores/peerStore';
import useStreamStore from '../stores/streamStore'

import MicrophoneButton from './MicrophoneButton'
import PhoneButton from './PhoneButton'

type ContentProps = {
  remoteAudio: MutableRefObject<HTMLAudioElement>,
  localAudio: MutableRefObject<HTMLAudioElement>,
}
function CallScreen({ remoteAudio, localAudio }: ContentProps) {
  const isPeerConnected = usePeerStore(state => state.isPeerConnected)

  return (
    <VStack h="90%" w="full">
      <Box fontSize="16px" h="5%">
        {
          !isPeerConnected && 
            <Text>Waiting for student to be connected...</Text>
        }
        </Box>
      <HStack flexBasis="75%" w="full" justifyContent="center" alignItems="center">
        <Image src={logo} w={["140px", "200px"]} />
      </HStack>
      <HStack
        justifyContent="center"
        spacing={8} flexGrow={1}
        w="full"
        bgColor="rgba(255, 255, 255, 0.4)"
      >
        <MicrophoneButton />
        <PhoneButton audio={remoteAudio} />
      </HStack>
    </VStack>
  )
}

export default CallScreen