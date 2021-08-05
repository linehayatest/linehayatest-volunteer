import React from 'react'
import { Grid, GridItem, Fade } from "@chakra-ui/react"

import List from "../components/List"
import AcceptButton from "../components/AcceptButton"
import MobileMenu from "../containers/MobileMenu"

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
  return (
    <List
      {...listStyles}
      title="Waiting Students"
      headers={["Student", "Action"]}
      rows={
        [
          {
            key: "Student 1",
            fields: ["Student 1", <AcceptButton />]
          },
        ]
      }
    />
  )
}

function VolunteerList() {
  return (
    <List
      {...listStyles}
      title="Online Volunteers"
      headers={["Volunteer", "Status"]}
      rows={
        [
          {
            key: "Student 1",
            fields: ["Student 1", "Free"]
          },
        ]
      }
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