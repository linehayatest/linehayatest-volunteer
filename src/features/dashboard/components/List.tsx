import React from 'react'
import { 
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react"

type Row = {
  key: string | number,
  fields: any[]
}
type ListProps = {
  title: string,
  headers: string[],
  rows: Row[],
  [x: string]: any,
}
function List({ title, headers, rows, ...props }: ListProps) {
  return (
    <Box flex="1" {...props}>
      <Text pt="2" mb="4" textAlign="center">{title}</Text>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {
              headers.map(header => <Th key={header}>{header}</Th>)
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            rows.map(row => (
              <Tr key={row.key}>
                { row.fields.map(field => (<Td>{field}</Td>)) }
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </Box>
  )
}

export default List
export type {
  ListProps,
}