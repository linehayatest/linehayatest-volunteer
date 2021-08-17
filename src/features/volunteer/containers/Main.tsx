import React from 'react'
import { Grid, GridItem, Fade } from "@chakra-ui/react"

import List from "@features/volunteer/components/List"
import AcceptButton from "@features/volunteer/components/AcceptButton"
import MobileMenu from "@features/volunteer/containers/MobileMenu"
import useDashboardStore from '../stores/dashboardStore'

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
  console.log('STUDENT HAHAHAHA')
  console.log(students)
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
  console.log('VOLUNTEER HAHAHAHA')
  console.log(volunteers)
  
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

type MainProps = {
  isOpen: boolean
}
function Main({ isOpen }: MainProps) {
  return (
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
  )
}

export default Main