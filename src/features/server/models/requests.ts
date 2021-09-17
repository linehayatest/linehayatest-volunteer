type RequestCode = 4 | 5 | 6 | 8

const REQUESTS = {
  VOLUNTEER_ACCEPT_CHAT_REQUEST: 1,
	VOLUNTEER_LOGIN: 2,
  VOLUNTEER_RECONNECT: 3,
	SEND_MESSAGE: 6,
	END_CONVERSATION: 7,
}
Object.freeze(REQUESTS)

type volunteerIdentity = 'volunteer'

type Message = {
  type: RequestCode,
  metadata: {
    type: volunteerIdentity
    identity: string
  }
}

type LoginRequest = {
  type: 2,
  metadata: {
    type: volunteerIdentity,
    identity: string,
  }
}

type EndConversationRequest = {
  type: 7,
  metadata: {
    type: volunteerIdentity,
    identity: string,
  }
}

type ReconnectRequest = {
  type: 3,
  metadata: {
    type: volunteerIdentity,
    identity: string
  }
}

type AcceptChatRequest = {
  type: 1,
  metadata: {
    type: volunteerIdentity,
    identity: string,
  },
  payload: {
    userId: number,
  }
}

type ChatMessage = {
  type: 6,
  metadata: {
    type: 'volunteer',
    identity: string
  },
  payload: {
    message: string,
  }
}

export { REQUESTS }

export type {
  Message,
  LoginRequest,
  AcceptChatRequest,
  ReconnectRequest,
  EndConversationRequest,
  ChatMessage,
}