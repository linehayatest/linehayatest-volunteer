import React from 'react'
import { Link } from "react-router-dom"
import { HStack, Box, Link as A } from "@chakra-ui/react"

type NavLinkProps = {
  text: string,
  link: string
}
function NavLink({ text, link }: NavLinkProps) {
  return (
    <Box px="2">
      <Link to={link}>
        <A textTransform="uppercase">{text}</A>
      </Link>      
    </Box>
  )
}

function NavBar() {
  return (
    <HStack py="4" px="8" fontSize="sm" borderBottom="1px">
      <NavLink text="LINEHAYAT" link="/" />
      <NavLink text="who we are" link="#" />
      <NavLink text="react us" link="#" />
      <NavLink text="volunteer" link="#" />
      <NavLink text="support us" link="#" />
      <NavLink text="resources" link="#" />
      <NavLink text="faq" link="#" />
      <NavLink text="our contacts" link="#" />
    </HStack>
  )
}

export default NavBar