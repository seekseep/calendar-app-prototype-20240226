import { DailyNote, Schedule } from "@/app/types"

export interface CalendarSettings {
  startDate: string
  endDate: string
  startHour: number
  endHour: number
  rowDepth: number
  hourSectionCount: number
}

export type CalendarStatus = 'loading' | 'ready'

export type DailyNoteDraft = (
  Partial<Pick<DailyNote, 'id'>>
  & Omit<DailyNote, 'id'>
)

export interface CalendarEvents {
  onChangeOptions?: (options: CalendarOptions) => any
  onCreateSchedule?: (schedule: Schedule) => any
  onUpdateSchedule?: (schedule: Schedule) => any
  onDeleteSchedule?: (schedule: Schedule) => any
  onCreateDailyNote?: (dailyNote: DailyNote) => any
  onUpdateDailyNote?: (dailyNote: DailyNoteDraft) => any
}

export type CalendarState = (
  CalendarSettings
  & {
    tags: string[]
    status: CalendarStatus
    rows: CalendaRowPayload[]
    rowsUpdatedAt: number
    cancledSchedules: Schedule[]
    scheduleToEdit: Schedule | null
    dailyNoteToEditTag: DailyNoteDraft | null
    dailyNoteToEditBody: DailyNoteDraft | null
  }
)

export type CalendarHelpers = {
  changeOptions: (options: CalendarOptions) => any
  createSchedule: (schedule: Schedule) => any
  updateSchedule: (schedule: Schedule) => any
  deleteSchedule: (schedule: Schedule) => any
  openSchedule: (schedule: Schedule) => any
  closeSchedule: () => any
  openDailyNoteTag: (dailyNote: DailyNoteDraft) => any
  closeDailyNoteTag: () => any
  openDailyNoteBody: (dailyNote: DailyNoteDraft) => any
  closeDailyNoteBody: () => any
  createDailyNote: (dailyNote: DailyNote) => any
  updateDailyNote: (dailyNote: DailyNoteDraft) => any
}

export type CalendarContextValue = (
  CalendarState
  & CalendarHelpers
)

export type CalendarOptions = (
  Partial<CalendarSettings>
)

export type CalendarScheduleRowPayload = {
  schedules: Schedule[]
}

type KeyValueSet = { key: string, value: string }

export type CalendarScheduleRowGroupPayload = {
  name: string
  rowCount: number
  type: 'schedule'
  rows: CalendarScheduleRowPayload[]
  note?: DailyNote
  keyValueSets: KeyValueSet[]
}

export type CalendarRowGroupPayload = {
  name: string
  rowCount: number
  type: 'group'
  rows: CalendaRowPayload[]
  note?: DailyNote
  keyValueSets: KeyValueSet[]
}

export type CalendaRowPayload = CalendarRowGroupPayload | CalendarScheduleRowGroupPayload
