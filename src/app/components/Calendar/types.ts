import { EditScheduleType } from "./CalendarEditScheduleDialogForm/types"

import { Account, DailyNote, Schedule } from "@/app/types"

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
  onBulkUpdateSchedules?: (schedules: UpdateScheduleInput[]) => any
  onDeleteSchedule?: (schedule: Schedule) => any
  onCreateDailyNote?: (dailyNote: DailyNote) => any
  onUpdateDailyNote?: (dailyNote: UpdateDailyNoteInput) => any
}

export type CalendarState = (
  CalendarSettings
  & {
    accounts: Account[]
    tags: string[]
    status: CalendarStatus
    rows: CalendaRowPayload[]
    rowsUpdatedAt: number
    cancledSchedules: Schedule[]
    // NOTE: UI
    selectedSchedules: Schedule[]
    scheduleToEdit: Schedule | null
    schedulesToEdit: [Schedule[], EditScheduleType] | null
    scheduleToDelete: Schedule | null
    schedulesToDelete: Schedule[] | null
    dailyNoteToEditTag: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'> | null
    dailyNoteToEditBody: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'> | null
    scheduleMenu: { schedule: Schedule, anchorEle: HTMLElement } | null
    tagMenu: { dailyNote: DailyNote, anchorEle: HTMLElement } | null
  }
)

export type CalendarHelpers = {
  changeOptions: (options: CalendarOptions) => any
  createSchedule: (schedule: Schedule) => any
  updateSchedule: (schedule: UpdateScheduleInput) => any
  bulkUpdateSchedules: (schedules: UpdateScheduleInput[]) => any
  deleteSchedule: (schedule: Schedule) => any
  createDailyNote: (dailyNote: DailyNote) => any
  updateDailyNote: (dailyNote: UpdateDailyNoteInput) => any
  openSchedule: (schedule: Schedule, anchorEle: HTMLElement) => any
  closeSchedule: () => any
  openTagMenu: (dailyNote: DailyNote, anchorEle: HTMLElement) => any
  closeTagMenu: () => any
  startToEditSchedule: (schedules: Schedule) => any
  finishToEditSchedule: () => any
  startToEditSchedules: (schedules: Schedule[], type: EditScheduleType) => any
  finishToEditSchedules: () => any
  startToDeleteSchedule: (schedules: Schedule) => any
  finishToDeleteSchedule: () => any
  startToDeleteSchedules: (schedules: Schedule[]) => any
  finishToDeleteSchedules: () => any
  startToEditDailyNoteTag: (dailyNote: DailyNote) => any
  finishToEditDailyNoteTag: () => any
  startToEditDailyNoteBody: (dailyNote: DailyNote) => any
  finishToEditDailyNoteBody: () => any
  toggleSelectedSchedule: (schedule: Schedule) => any
  clearSelectedSchedules: () => any
  selectAllSchedules: () => any
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
