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

export type UpdateDailyNoteInput = (
  Pick<DailyNote, 'id'>
  & Partial<Omit<DailyNote, 'id'>>
)

export type UpdateScheduleInput = (
  Pick<Schedule, 'id'>
  & Partial<Omit<Schedule, 'id'>>
)

export interface CalendarEvents {
  onChangeOptions?: (options: CalendarOptions) => any
  onCreateSchedule?: (schedule: Schedule) => any
  onUpdateSchedule?: (schedule: UpdateScheduleInput) => any
  onDeleteSchedule?: (schedule: Schedule) => any
  onCreateDailyNote?: (dailyNote: DailyNote) => any
  onUpdateDailyNote?: (dailyNote: UpdateDailyNoteInput) => any
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
    schedulesToEdit: Schedule[] | null
    dailyNoteToEditTag: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'> | null
    dailyNoteToEditBody: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'> | null
    selectedSchedules: Schedule[]
  }
)

export type CalendarHelpers = {
  changeOptions: (options: CalendarOptions) => any
  createSchedule: (schedule: Schedule) => any
  updateSchedule: (schedule: UpdateScheduleInput) => any
  deleteSchedule: (schedule: Schedule) => any
  openSchedule: (schedule: Schedule) => any
  openSchedules: (schedules: Schedule[]) => any
  closeSchedule: () => any
  closeSchedules: () => any
  openDailyNoteTag: (dailyNote: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'>) => any
  closeDailyNoteTag: () => any
  openDailyNoteBody: (dailyNote: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'>) => any
  closeDailyNoteBody: () => any
  createDailyNote: (dailyNote: DailyNote) => any
  updateDailyNote: (dailyNote: UpdateDailyNoteInput) => any
  toggleSelectedSchedule: (schedule: Schedule) => any
  clearSelectedSchedules: () => any
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
