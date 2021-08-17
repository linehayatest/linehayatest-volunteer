import { WebSocketLike } from 'react-use-websocket/dist/lib/types'
import create from 'zustand'

type WebSocketStore = {
  sendMessage: (message: string) => void,
  setSendMessage: (send: (message: string) => void) => void,
  sendJsonMessage: (jsonMessage: any) => void,
  setSendJsonMessage: (send: (jsonMessage: any) => void) => void,
  lastJsonMessage: WebSocketEventMap['message']['data'] | null,
  setLastJsonMessage: (message: WebSocketEventMap['message']['data']) => void,
  // -1 if uninstantiated, otherwise follows WebSocket readyState mapping: 0: 'Connecting', 1 'OPEN', 2: 'CLOSING', 3: 'CLOSED'

  readyState: number,
  setReadyState: (state: number) => void,
  getWebSocket: () => (WebSocketLike | null),
  setGetWebSocket: (getWS: () => (WebSocketLike | null)) => void,
}

const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  sendMessage: (message: string) => { throw("sendMessage not set ") },
  sendJsonMessage: (jsonMessage: any) => { throw("sendJsonMessage not set") },
  lastJsonMessage: {},
  readyState: -1,
  getWebSocket: () => null,
  setSendMessage: (s) => set(_state => ({ sendMessage: s })),
  setSendJsonMessage: (s) => set(_state => ({ sendJsonMessage: s })),
  setLastJsonMessage: (s) => set(_state => ({ lastJsonMessage: s })),
  setReadyState: (s) => set(_state => ({ readyState: s })),
  setGetWebSocket: (s) => set(_state => ({ getWebSocket: s })),
}))

export default useWebSocketStore