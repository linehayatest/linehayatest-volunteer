import React, { PropsWithChildren } from "react";
import { GridItem } from "@chakra-ui/layout";

type MainProps = PropsWithChildren<{}>
function Main({ children }: MainProps) {
  return (
    <GridItem colSpan={[2, 2, 1]} overflow="auto" bgColor="gray.100">
      {children}
    </GridItem>
  )
}

export default Main