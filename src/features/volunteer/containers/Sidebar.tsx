import React, { ReactChild } from "react"
import { Box, VStack, Text, Button } from "@chakra-ui/react"
import { Link, useLocation } from 'react-router-dom'
// import { useRouter } from 'next/router'
import { useAuth0 } from '@auth0/auth0-react'
import { BASE_URL } from "../../../urls"

type SideLinkProps = {
  text: string,
  active?: boolean,
  href: string,
}

function SideLink({ text, active=false, href }: SideLinkProps) {
  return (
    <Link
      to={href}
    >
      <Box
        textDecoration="none"
        fontSize={["16px", "18px"]}
        mx="4" mb="4"
        px="4" py="2"
        fontWeight={active ? "700" : "400"}
        color={active ? 'teal.700' : 'gray.700'}
        bg={active ? 'teal.100' : ''}
        rounded="md"
      >
        {text}
      </Box>
    </Link>
  )
}

type LogoutButtonProps = {
  [x: string]: any
}
function LogoutButton({ ...props }: LogoutButtonProps) {
  const { logout } = useAuth0();

  function handleLogout() {
    logout({ returnTo: `${BASE_URL}` })
  }

  return (
    <Button
      width="80%"
      display="block"
      size="sm"
      fontSize="16px"
      rounded="md"
      variant="solid" colorScheme="red"
      onClick={handleLogout}
      {...props}
    >
      <Text color="white">Log out</Text>
    </Button>
  )
}

function useIsLinkActive() {
  const { pathname } = useLocation()

  return (href: string) => pathname === href
}

function Sidebar() {
  const isLinkActive = useIsLinkActive()

  return (
    <Box w="100%" h="100%" mt="0" pt="20px" position="relative">
      <SideLink text="Dashboard" active={isLinkActive("/volunteer")} href="/volunteer" />
      <SideLink text="Chat" active={isLinkActive("/volunteer/chat")} href="/volunteer/chat" />
      <LogoutButton
        position="absolute"
        left="20px"
        bottom="40px"
      />
    </Box>
  )
}

export default Sidebar;