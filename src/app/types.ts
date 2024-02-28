export interface Account {
  id: string
  name: string
}

export type ScheduleStatus = 'NORMAL' | 'ERROR'

export interface Schedule {
  id: string
  accountId: string
  startedAt: string
  finishedAt: string
  label: string
  color: string
  backgroundColor: string
  borderColor: string
  errorIcon: boolean
  status: ScheduleStatus
  row: number
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
