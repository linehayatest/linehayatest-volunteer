import React from 'react'
import { HStack, Box, Text } from "@chakra-ui/react"

function ChatAvatar() {
  return (
    <HStack w="70%" alignSelf="center">
      <Box borderRadius="50%" w="3rem" my="4" h="3rem" backgroundColor="gray.200" />
      <Text fontSize="sm">LineHayat Live Chat</Text>
    </HStack>
  )
}

export default ChatAvatar