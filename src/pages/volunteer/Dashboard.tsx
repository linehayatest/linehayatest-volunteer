import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react"

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
// export default withAuthenticationRequired(Dashboard)