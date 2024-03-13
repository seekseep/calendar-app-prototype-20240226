export type AccountType = 'TEACHER' | 'STUDENT'

export interface Account {
  id: string
  name: string
  type: AccountType
}

export type ScheduleStatus = 'NORMAL' | 'CANCELED'

export interface Schedule {
  id: string
  studentIds: string[]
  teacherIds: string[]
  startedAt: string
  finishedAt: string
  label: string
  color: string
  status: ScheduleStatus
  hasProblems: boolean
  row: number
  subject: string
  format: string
  note: string
  createId: string
}

export interface TeamDailyNote {
  id: string
  resourceId: string
  type: 'TEAM'
  tag: string
  body: string
  date: string
}

export interface AccountDailyNote {
  id: string
  resourceId: string
  type: 'ACCOUNT'
  tag: string
  body: string
  date: string
}

export type DailyNote = TeamDailyNote | AccountDailyNote
