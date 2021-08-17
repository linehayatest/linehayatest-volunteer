import create from "zustand"
import { persist } from "zustand/middleware"

type studentState = 'idling' | 'waiting' | 'chatting'

type studentStateStore = {
  studentState: studentState,
  setStudentState: (s: studentState) => void,
}

export const useStudentStateStore = create<studentStateStore>(persist(
  (set, get) => ({
    studentState: 'idling',
    setStudentState: (s) => set({ studentState: s })
  }),
  {
    name: "student-state", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

export default useStudentStateStore
export type {
  studentState
}