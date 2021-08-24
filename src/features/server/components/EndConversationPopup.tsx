import React from 'react'
import create from 'zustand'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"
import history from '@globals/history'

type EndConversationPopupStore = {
  isOpen: boolean,
  onClose: () => void,
  onOpen: () => void,
}

const useEndConversationPopupStore = create<EndConversationPopupStore>(set => ({
  isOpen: false,
  onClose: () => { set({ isOpen: false }) },
  onOpen: () => { set({ isOpen: true }) },
}))

function EndConversationPopup() {
  const { isOpen, onClose } = useEndConversationPopupStore(state => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }))

  const handleOkClick = () => {
    onClose()
    history.push("/")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Student has ended conversation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleOkClick}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EndConversationPopup
export {
  useEndConversationPopupStore
}