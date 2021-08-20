import create from 'zustand'

type Volunteer = {
  email: string,
  state: string,
}

type Student = {
  userId: number
}

type DashboardUpdateEvent = {
  volunteers: Volunteer[],
  students: Student[],
}

type DashboardStore = {
  volunteers: Volunteer[],
  students: Student[],
  setStudents: (students: Student[]) => void,
  setVolunteers: (volunteers: Volunteer[]) => void,
}

const useDashboardStore = create<DashboardStore>(set => ({
  volunteers: [],
  students: [],
  setStudents: (students) => set(_state => ({ students: students })),
  setVolunteers: (volunteers) => set(_state => ({ volunteers: volunteers })),
}))

export default useDashboardStore

export type {
  Volunteer,
  Student,
  DashboardUpdateEvent,
}