const EVENT: { [x: string]: number } = {
  CHAT_REQUEST_ACCEPTED: 1,
	CHAT_MESSAGE: 2,
	PARTY_HAS_RECONNECT: 3,
	PARTY_HAS_DISCONNECT: 4,
	PARTY_HAS_TIMEOUT: 5,
	PARTY_HAS_END_CONVERSATION: 6,
	DASHBOARD_STATUS_UPDATE: 7,
}

type Event = {
  type: typeof EVENT[string],
}

type DashboardStatusUpdateEvent = {
  type: typeof EVENT.DASHBOARD_STATUS_UPDATE,
  volunteers: {
    email: string,
    state: string
  }[],
  students: {
    userId: number
  }[],
}

type ChatMessageEvent = {
  type: typeof EVENT.CHAT_MESSAGE,
  message: string,
}

export {
  EVENT
}

export type {
  Event,
  DashboardStatusUpdateEvent,
  ChatMessageEvent,
}