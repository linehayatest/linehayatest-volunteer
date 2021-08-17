import create from 'zustand'

type Chat = {
  message: string,
  fromSelf: boolean,
  time: Date,
}

type ChatStore = {
  chats: Chat[],
  addChat: (chat: Chat) => void
}

const useChatStore = create<ChatStore>(set => ({
  chats: [],
  addChat: (chat) => set(state => ({ chats: [ ...state.chats, chat ]}))
}))

export default useChatStore

export type { 
  Chat
}