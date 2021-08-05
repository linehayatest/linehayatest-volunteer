import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react"

function Chat() {
  return (
    <div>chat</div>
  )
}

export default withAuthenticationRequired(Chat)