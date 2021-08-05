import React from 'react'
import { Text, Box } from "@chakra-ui/react"

function WaitingCard() {
  return (
    <Box
      textAlign="center"
      color="gray.700"
      borderColor="gray.400"
      rounded="xl"
      border="1px"
      w="80%"
      alignSelf="center"
      py="4"
    >
      <Text mb="1" fontWeight="semibold">Waiting Room</Text>

      <Text mb="4" fontSize="xs" fontWeight="semibold">o o o</Text>

      <Box mb="6">
        <Text>Hi, Friend, I am your listener today.</Text>
        <Text>You are now in the queue, I will reach you soon.</Text>
        <Text>Thank you for your patience.</Text>
      </Box>

      <Box mb="6">
        <Text>While waiting to get in</Text>
        <Text>There are few things that I would like to tell you.</Text>
      </Box>

      <Box mb="6">
        <Text>Feel free to share your thoughts and feelings.</Text>
        <Text>Talk at your own pace and willingness.</Text>
        <Text>Please take your time to gather your thoughts if needed.</Text>
      </Box>

      <Box mb="6">
        <Text>I appreciate you being here today.</Text>
      </Box>
    </Box>
  )
}

export default WaitingCard