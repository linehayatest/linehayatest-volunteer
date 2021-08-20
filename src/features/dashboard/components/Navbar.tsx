import React, { ReactElement, JSXElementConstructor } from "react"
import { HStack, Text, Box, IconButton } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"



type BurgerButtonProps = {
  icon: ReactElement<any, string | JSXElementConstructor<any>>,
  onClick: () => void,
  ariaLabel: string,
  [x: string]: any,
}
function BurgerButton({ icon, onClick, ariaLabel, ...props }: BurgerButtonProps) {
  return (
    <IconButton
      icon={icon}
      onClick={onClick}
      aria-label={ariaLabel}
      size="sm" rounded="md"
      bgColor="white"
      {...props}
    />
  )
}

function useHamburgerButton() {

}

type NavbarProps = {
  isOpen: boolean,
  onToggle: () => void,
}
function Navbar({ isOpen, onToggle }: NavbarProps) {
  return (
    <HStack w="100%" h="100%" justifyContent="space-between">
      <Box flexBasis="33.3%" spacing={0}>
        <BurgerButton
          display={["block", "block", "none"]}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          ariaLabel=""
          ml="2"
        />
      </Box>
      <Box flexBasis="33.3%">
        <Text textAlign="center">LineHayat</Text>
      </Box>
      <Box flexBasis="33.3%">
        
      </Box>
    </HStack>
  )
}

export default Navbar