import create from "zustand"
import { persist } from "zustand/middleware"

type volunteerState = 'idling' | 'busy-chat'

type volunteerStateStore = {
  volunteerState: volunteerState,
  setVolunteerState: (v: volunteerState) => void,
}

export const useVolunteerStateStore = create<volunteerStateStore>(persist(
  (set, get) => ({
    volunteerState: 'idling',
    setVolunteerState: (s) => set({ volunteerState: s })
  }),
  {
    name: "volunteer-state", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

export default useVolunteerStateStore
export type {
  volunteerState
}