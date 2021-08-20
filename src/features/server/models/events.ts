import { Volunteer, Student } from "@features/dashboard/stores/dashboardStore"

type ServerEvent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const EVENTS = {
  CHAT_REQUEST_ACCEPTED: 1,
  CHAT_MESSAGE: 2, 
  PARTY_HAS_RECONNECT: 3,
	PARTY_HAS_DISCONNECT: 4,
	PARTY_HAS_TIMEOUT: 5,
	PARTY_HAS_END_CONVERSATION: 6,
	DASHBOARD_STATUS_UPDATE: 7,
	CHAT_REQUEST_REPLY: 8,
}
Object.freeze(EVENTS)

type ChatEvent = {
  type: 2,
  message: string
}

type DashboardUpdateEvent = {
  type: 7,
  volunteers: Volunteer[],
  students: Student[],
}

export type { 
  DashboardUpdateEvent,
  ServerEvent,
  ChatEvent,
}

export { EVENTS }