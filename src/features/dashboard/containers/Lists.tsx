import React from 'react'

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
    fields: [s.userId, <AcceptButton userId={s.userId} />]
  }))

  return (
    <List
      {...listStyles}
      title="Waiting Students"
      headers={["Student", "Action"]}
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