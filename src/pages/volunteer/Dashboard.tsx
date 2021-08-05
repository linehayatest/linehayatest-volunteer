import React, { PropsWithChildren } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { withAuthenticationRequired } from "@auth0/auth0-react"
import Layout from "../../layout/SidebarLayout"
import Navbar from "../../features/volunteer/containers/Navbar"
import Sidebar from "../../features/volunteer/containers/Sidebar"
import Main from "../../features/volunteer/containers/Main"

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
        <Main isOpen={isOpen} />        
      </Layout.Main>
    </Layout>
  )
}

export default Dashboard
// export default withAuthenticationRequired(Dashboard)