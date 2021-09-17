import React from 'react'
import { Grid, GridItem, Fade, useDisclosure } from "@chakra-ui/react"

import MobileMenu from "../components/MobileMenu"
import useDashboardStore from '../stores/dashboardStore'

import Layout from "@layout/SidebarLayout"
import Navbar from "@features/dashboard/components/Navbar"
import Sidebar from "@features/chat/components/Sidebar"
import { StudentList, VolunteerList } from "../containers/Lists"

function Dashboard() {
  const {isOpen, onToggle} = useDisclosure()
  return (
    <Layout>
      <Layout.Navbar>
        <Navbar isOpen={isOpen} onToggle={onToggle} />
      </Layout.Navbar>
      <Layout.Sidebar>
        <Sidebar />
      </Layout.Sidebar>
      <Layout.Main>
        <Grid
          templateRows={["1fr 1fr", "1fr 1fr", "1fr"]}
          templateColumns={["1fr", "1fr", "1fr 1fr"]}
          w="full" h="full"
        >
          <GridItem
            colStart={1} colSpan={1}
            rowStart={1} rowSpan={1}
            py="4" pb={["0", "0", "4"]}>
            <StudentList />
          </GridItem>
          <GridItem
            colStart={[1, 1, 2]} colSpan={1}
            rowStart={[2, 2, 1]} rowSpan={1}
            py="4" pt={["0", "0", "4"]}
          >
            <VolunteerList />
          </GridItem>
          <GridItem
            display={[
                isOpen ? "block" : "none",
                isOpen ? "block" : "none",
                "none"
            ]}
            zIndex={1}
            colStart={1} colSpan={2}
            rowStart={1} rowSpan={2}
          >
            <MobileMenu />
          </GridItem>
        </Grid>
      </Layout.Main>
    </Layout>
  )
}

export default Dashboard