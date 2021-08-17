import React from 'react'
import { Box, HStack, VStack, Text } from "@chakra-ui/react";

import WaitingCard from './WaitingCard'
import ChatAvatar from './ChatAvatar'

function WaitingRoom() {
  return (
    <VStack w="100vw" h="100vh" alignItems="normal" spacing={0}>
      <ChatAvatar />
      <WaitingCard />
    </VStack>
  )
}

export default WaitingRoom