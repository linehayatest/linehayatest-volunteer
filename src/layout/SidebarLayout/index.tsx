import React, { PropsWithChildren } from "react";
import { Grid } from "@chakra-ui/layout";

import Main from "./Main"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

type LayoutProps = PropsWithChildren<{}>
function Layout({ children }: LayoutProps) {
  return (
    <Grid
      templateRows="3rem 1fr"
      templateColumns="12rem 6fr"
      height="100vh"
      width="100vw"
    >
      {children}
    </Grid>
  )
}

Layout.Main = Main
Layout.Navbar = Navbar
Layout.Sidebar = Sidebar

export default Layout

