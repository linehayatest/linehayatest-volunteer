import React, { PropsWithChildren } from 'react'
import { GridItem } from "@chakra-ui/react"

type NavbarProps = PropsWithChildren<{}>
function Navbar({ children }: NavbarProps) {
  return (
    <GridItem colSpan={2} zIndex={1}boxShadow="md">
      {children}
    </GridItem>
  )
}

export default Navbar