import React from "react"
import { HStack, Text } from "@chakra-ui/react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import Dashboard from "@features/dashboard/containers/Dashboard"
import { useAuth0 } from "@auth0/auth0-react"

function DashboardPage() {
  const { isAuthenticated } = useAuth0()

  return (
    <Dashboard />
  )
}

export default withAuthenticationRequired(DashboardPage)