const ACTION = {
  VOLUNTEER_ACCEPT_CHAT_REQUEST: 1,
	VOLUNTEER_LOGIN: 2,
  VOLUNTEER_RECONNECT: 3,
	STUDENT_REQUEST_FOR_CHAT: 4,
	STUDENT_RECONNECT: 5,
	SEND_MESSAGE: 6,
  END_CONVERSATION: 7,
}

type Action = {
  code: number,
  payload: null | any,
}

type VolunteerAcceptChatPayload = { userId: number }

type VolunteerReconnectPayload = { email: string }

type VolunteerLoginPayload = { email: string }

type StudentReconnectPayload = { userId: number }

type SendMessagePayload = { message: string }

export { 
  ACTION
}

export type {
  Action,
  VolunteerAcceptChatPayload,
  VolunteerLoginPayload,
  VolunteerReconnectPayload,
  StudentReconnectPayload,
  SendMessagePayload,
}

