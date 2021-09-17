import React from 'react'
import { PhoneIcon, ChatIcon } from "@chakra-ui/icons"

import List from "../components/List"
import useDashboardStore from "../stores/dashboardStore"
import AcceptButton from "../components/AcceptButton"

const listStyles = {
  mx:"auto",
  px:["0", "0", "4"],
  pt:"2",
  h:"90%",
  w:"95%",
  overflow:"auto",
  bgColor:"white",
  rounded:"md"
}

function StudentList() {
  const students = useDashboardStore(state => state.students)
  const rows = students.map(s => ({
    key: s.userId,
    fields: [
      s.userId, 
      s.state === 'wait-call' ? <PhoneIcon /> : <ChatIcon />,
      <AcceptButton userId={s.userId} type={s.state} />
    ]
  }))

  return (
    <List
      {...listStyles}
      title="Waiting Students"
      headers={["Student", "Type", "Action"]}
      rows={rows}
    />
  )
}

function VolunteerList() {
  const volunteers = useDashboardStore(state => state.volunteers)
  
  const rows = volunteers.map(v => ({
    key: v.email,
    fields: [v.email, v.state]
  }))

  return (
    <List
      {...listStyles}
      title="Online Volunteers"
      headers={["Volunteer", "Status"]}
      rows={rows}
    />
  )
}

export {
  StudentList,
  VolunteerList
}