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

type ReconnectPopupStore = {
  isOpen: boolean,
  contentType: 'chatting' | 'terminated',
  onClose: () => void,
  onOpen: () => void,
  setContentType: (s: ReconnectPopupStore['contentType']) => void,
}

const useReconnectPopupStore = create<ReconnectPopupStore>(set => ({
  isOpen: false,
  contentType: 'terminated',
  onClose: () => { set({ isOpen: false }) },
  onOpen: () => { set({ isOpen: true }) },
  setContentType: (s) => { set({ contentType: s })},
}))

function ReconnectPopup() {
  const { isOpen, onClose, contentType } = useReconnectPopupStore(state => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
    contentType: state.contentType,
  }))

  const handleOkClick = () => {
    onClose()
    history.push("/")
  }

  const handleContinueChatClick = () => {
    onClose()
    history.push("/chat")
    // TODO: query server if student is in disconnect or Active
    // TODO: set student state, disable send chat if student is in disconnect
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {
        contentType === 'chatting' ? (
          <ModalContent>
            <ModalHeader>Your last session is still active.</ModalHeader>
            <ModalBody>
              We'll redirect you to chat page, and you can continue to chat with Student or End conversation.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleContinueChatClick}>
                Ok
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader>Student has ended conversation, yes.</ModalHeader>
            <ModalBody>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleOkClick}>
                Ok
              </Button>
            </ModalFooter>
        </ModalContent>
        )
      }
      </Modal>
  )
}

export default ReconnectPopup
export {
  useReconnectPopupStore
}