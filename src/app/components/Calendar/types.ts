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

export interface CalendarEvents {
  onChangeOptions?: (options: CalendarOptions) => any
  onCreateSchedule?: (schedule: Schedule) => any
  onUpdateSchedule?: (schedule: Schedule) => any
  onDeleteSchedule?: (schedule: Schedule) => any
  onCreateDailyNote?: (dailyNote: DailyNote) => any
  onUpdateDailyNote?: (dailyNote: Partial<Omit<DailyNote, 'id'>> & { id: string }) => any
}

export type CalendarState = (
  CalendarSettings
  & {
    tags: string[]
    status: CalendarStatus
    rows: CalendaRowPayload[]
    rowsUpdatedAt: number
    scheduleToEdit: Schedule | null
    dailyNoteToEditTag: DailyNote | null
    dailyNoteToEditBody: DailyNote | null
  }
)

export type CalendarHelpers = {
  changeOptions: (options: CalendarOptions) => any
  createSchedule: (schedule: Schedule) => any
  updateSchedule: (schedule: Schedule) => any
  deleteSchedule: (schedule: Schedule) => any
  openSchedule: (schedule: Schedule) => any
  closeSchedule: () => any
  openDailyNoteTag: (dailyNote: DailyNote) => any
  closeDailyNoteTag: () => any
  openDailyNoteBody: (dailyNote: DailyNote) => any
  closeDailyNoteBody: () => any
  updateDailyNote: (dailyNote: DailyNote) => any
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

export type CalendarScheduleRowGroupPayload = {
  name: string
  rowCount: number
  type: 'schedule'
  rows: CalendarScheduleRowPayload[]
  note?: DailyNote
}

export type CalendarRowGroupPayload = {
  name: string
  rowCount: number
  type: 'group'
  rows: CalendaRowPayload[]
  note?: DailyNote
}

export type CalendaRowPayload = CalendarRowGroupPayload | CalendarScheduleRowGroupPayload
