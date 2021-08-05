import React, { PropsWithChildren } from 'react'
import { GridItem, Link as A } from "@chakra-ui/react"
import { Link } from "react-router-dom"

type SidebarLinkProps = {
  text: string,
  href: string,
}
function SidebarLink({ text, href }: SidebarLinkProps) {
  return (
    <A>
      <Link to={href}>{text}</Link>
    </A>
  )
}

type SidebarProps = PropsWithChildren<{}>
function Sidebar({ children }: SidebarProps) {
  return (
    <GridItem display={["none", "none", "block"]} position="relative" overflow="auto">
      {children}
    </GridItem>
  )
}

Sidebar.Link = SidebarLink

export default Sidebar