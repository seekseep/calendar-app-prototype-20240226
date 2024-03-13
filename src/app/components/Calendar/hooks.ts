'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { createRows } from "./services/calendarPack"
import { useCalendarTheme, useDailyNoteWidth, useHourHeight, useHourWidth, useRowHeaderWidth, useScheduleRowHeight } from "./theme/hooks"
import { CalendarContextValue, CalendarEvents, CalendarHelpers, CalendarOptions, CalendarSettings, CalendarStatus, UpdateDailyNoteInput, UpdateScheduleInput } from "./types"

import { Account, DailyNote, Schedule } from "@/app/types"

const noop = () => undefined

const defaultCalendarContextValue: CalendarContextValue = {
  startDate: '1970-01-01',
  endDate: '1970-01-01',
  startHour: 0,
  endHour: 23,
  rowDepth: 2,
  hourSectionCount: 4,
  status: 'loading',
  rows: [],
  tags: [],
  accounts: [],
  cancledSchedules: [],
  selectedSchedules: [],
  rowsUpdatedAt: -1,
  scheduleToEdit: null,
  dailyNoteToEditTag: null,
  dailyNoteToEditBody: null,
  schedulesToEdit: null,
  scheduleMenu: null,
  tagMenu: null,
  scheduleToDelete: null,
  schedulesToDelete: null,
  changeOptions: noop,
  createSchedule: noop,
  updateSchedule: noop,
  bulkUpdateSchedules: noop,
  deleteSchedule: noop,
  createDailyNote: noop,
  updateDailyNote: noop,
  openSchedule: noop,
  closeSchedule: noop,
  openTagMenu: noop,
  closeTagMenu: noop,
  startToEditSchedule: noop,
  finishToEditSchedule: noop,
  startToEditSchedules: noop,
  finishToEditSchedules: noop,
  startToDeleteSchedule: noop,
  finishToDeleteSchedule: noop,
  startToDeleteSchedules: noop,
  finishToDeleteSchedules: noop,
  startToEditDailyNoteTag: noop,
  finishToEditDailyNoteTag: noop,
  startToEditDailyNoteBody: noop,
  finishToEditDailyNoteBody: noop,
  toggleSelectedSchedule: noop,
  clearSelectedSchedules: noop,
  selectAllSchedules: noop,
}

export const CalendarContext = createContext<CalendarContextValue>(defaultCalendarContextValue)

export function useCalendarValue ({
  options,
  accounts,
  schedules,
  dailyNotes,
  onChangeOptions,
  onCreateSchedule,
  onUpdateSchedule,
  onBulkUpdateSchedules,
  onDeleteSchedule,
  onCreateDailyNote,
  onUpdateDailyNote
}: {
  options?: Partial<CalendarContextValue>
  accounts?: Account[]
  schedules?: Schedule[]
  dailyNotes?: DailyNote[]
} & CalendarEvents): CalendarContextValue {
  const [status, setStatus] = useState<CalendarStatus>('loading')

  const [scheduleMenu, setScheduleMenu] = useState<{ schedule: Schedule, anchorEle: HTMLElement } | null>(null)
  const [tagMenu, setTagMenu] = useState<{ dailyNote: DailyNote, anchorEle: HTMLElement } | null>(null)
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null)
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(null)
  const [schedulesToEdit, setSchedulesToEdit] = useState<Schedule[] | null>(null)
  const [schedulesToDelete, setSchedulesToDelete] = useState<Schedule[] | null>(null)
  const [selectedSchedules, setSelectedSchedules] = useState<Schedule[]>([])
  const [dailyNoteToEditTag, setDailyNoteToEditTag] = useState<Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'> | null>(null)
  const [dailyNoteToEditBody, setDailyNoteToEditBody] = useState<Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'> | null>(null)

  const cancledSchedules = useMemo(() => {
    return schedules?.filter(schedule => schedule.status === 'CANCELED') ?? []
  }, [schedules])

  const tags = useMemo(() => {
    const tags: Record<string, boolean> = {}
    for (const dailyNote of dailyNotes ?? []) {
      if(!dailyNote.tag) continue
      tags[dailyNote.tag] = true
    }
    return Object.keys(tags).sort()
  }, [dailyNotes])

  const settings = useMemo((): CalendarSettings => ({
    startDate: options?.startDate ?? defaultCalendarContextValue.startDate,
    endDate: options?.endDate ?? defaultCalendarContextValue.endDate,
    startHour: options?.startHour ?? defaultCalendarContextValue.startHour,
    endHour: options?.endHour ?? defaultCalendarContextValue.endHour,
    rowDepth: options?.rowDepth ?? defaultCalendarContextValue.rowDepth,
    hourSectionCount: options?.hourSectionCount ?? defaultCalendarContextValue.hourSectionCount,
  }), [options?.endDate, options?.endHour, options?.hourSectionCount, options?.rowDepth, options?.startDate, options?.startHour])

  const [rows, rowsUpdatedAt] = useMemo(() => {
    const rows = createRows(
      settings.startDate,
      settings.endDate,
      accounts ?? [],
      schedules ?? [],
      dailyNotes ?? []
    )
    const rowsUpdatedAt = new Date().getTime()
    return [rows, rowsUpdatedAt]
  }, [
    accounts,
    schedules,
    dailyNotes,
    settings.startDate,
    settings.endDate,
  ])

  useEffect(() => {
    if (!accounts || !schedules) {
      setStatus('loading')
      return
    }
    setStatus('ready')
  }, [ accounts, schedules ])

  const helpers = useMemo(() => ({
    changeOptions: (updated: Partial<CalendarOptions>) => {
      if (!onChangeOptions) return
      onChangeOptions({
        endDate: updated.endDate ?? settings.endDate,
        startDate: updated.startDate ?? settings.startDate,
        startHour: updated.startHour ?? settings.startHour,
        endHour: updated.endHour ?? settings.endHour,
        rowDepth: updated.rowDepth ?? settings.rowDepth,
        hourSectionCount: updated.hourSectionCount ?? settings.hourSectionCount,
      })
    },
    updateDailyNote (dailyNote: UpdateDailyNoteInput) {
      if (!onUpdateDailyNote) return
      onUpdateDailyNote(dailyNote)
    },
    createDailyNote (dailyNote: DailyNote) {
      if (!onCreateDailyNote) return
      onCreateDailyNote(dailyNote)
    },
    createSchedule (schedule: Schedule) {
      if (!onCreateSchedule) return
      onCreateSchedule(schedule)
    },
    updateSchedule (schedule: UpdateScheduleInput) {
      if (!onUpdateSchedule) return
      onUpdateSchedule(schedule)
    },
    bulkUpdateSchedules (schedules: UpdateScheduleInput[]) {
      if (!onBulkUpdateSchedules) return
      onBulkUpdateSchedules(schedules)
    },
    deleteSchedule (schedule: Schedule) {
      if (!onDeleteSchedule) return
      onDeleteSchedule(schedule)
    },
    toggleSelectedSchedule(schedule: Schedule) {
      const index = selectedSchedules.findIndex(s => s.id === schedule.id)
      if (index === -1) {
        setSelectedSchedules([...selectedSchedules, schedule])
      } else {
        setSelectedSchedules(
          selectedSchedules.slice(0, index).concat(selectedSchedules.slice(index + 1))
        )
      }
    },
    selectAllSchedules() {
      setSelectedSchedules(schedules ?? [])
    },
    clearSelectedSchedules() {
      setSelectedSchedules([])
    },
    openSchedule (schedule, anchorEle) {
      setScheduleMenu({ schedule, anchorEle })
    },
    closeSchedule () {
      setScheduleMenu(null)
    },
    openTagMenu(dailyNote, anchorEle) {
      setTagMenu({ dailyNote, anchorEle })
    },
    closeTagMenu() {
      setTagMenu(null)
    },
    finishToEditDailyNoteBody () {
      setDailyNoteToEditBody(null)
    },
    startToEditDailyNoteBody (dailyNote) {
      setDailyNoteToEditBody(dailyNote)
    },
    startToEditDailyNoteTag (dailyNote) {
      setDailyNoteToEditTag(dailyNote)
    },
    finishToEditDailyNoteTag () {
      setDailyNoteToEditTag(null)
    },
    startToEditSchedules (schedules) {
      setSchedulesToEdit(schedules)
    },
    finishToEditSchedules () {
      setSchedulesToEdit(null)
    },
    startToDeleteSchedule (schedule) {
      setScheduleToDelete(schedule)
    },
    finishToDeleteSchedule () {
      setScheduleToDelete(null)
    },
    startToDeleteSchedules (schedules) {
      setSchedulesToDelete(schedules)
    },
    finishToDeleteSchedules () {
      setSchedulesToDelete(null)
    },
    startToEditSchedule (schedule) {
      setScheduleToEdit(schedule)
    },
    finishToEditSchedule () {
      setScheduleToEdit(null)
    },
  } as CalendarHelpers), [
    onChangeOptions,
    onCreateDailyNote,
    onCreateSchedule,
    onDeleteSchedule,
    onUpdateDailyNote,
    onUpdateSchedule,
    onBulkUpdateSchedules,
    selectedSchedules,
    settings.endDate,
    settings.endHour,
    settings.hourSectionCount,
    settings.rowDepth,
    settings.startDate,
    settings.startHour,
    schedules,
  ])

  return {
    ...settings,
    ...helpers,
    accounts: accounts ?? [],
    tags,
    status,
    rows,
    rowsUpdatedAt,
    scheduleToEdit,
    dailyNoteToEditTag,
    dailyNoteToEditBody,
    cancledSchedules,
    selectedSchedules,
    schedulesToEdit,
    scheduleMenu,
    tagMenu,
    scheduleToDelete,
    schedulesToDelete,
  }
}

export function useHours () {
  const { startHour, endHour } = useContext(CalendarContext)
  const hours = useMemo(() => {
    const hours = []
    for (let hour = startHour; hour <= endHour; hour++) hours.push(hour)
    return hours
  }, [startHour, endHour])
  return hours
}

export function useRowDepth () {
  const { rowDepth } = useContext(CalendarContext)
  return rowDepth
}

export function useCalendarWidth () {
  const hours = useHours()
  const rowDepth = useRowDepth()
  const hourWidth = useHourWidth()
  const rowHeaderWidth = useRowHeaderWidth()
  const dailyNoteWidth = useDailyNoteWidth()
  return useMemo(() => {
    return (
      hours.length * hourWidth
      + (rowDepth + 1) * rowHeaderWidth
      + (rowDepth - 1) * dailyNoteWidth
    )
  }, [dailyNoteWidth, hourWidth, hours.length, rowDepth, rowHeaderWidth])
}

export function useCalendarRowWidth(depth: number = 0) {
  const calendarWidth = useCalendarWidth()
  const { rowDepth } = useContext(CalendarContext)
  const { rowHeaderWidth, dailyNoteWidth } = useCalendarTheme()

  const rowHeadersWitdth = rowHeaderWidth * depth
  const dailyNotesWidth = dailyNoteWidth * (rowDepth - depth)
  return calendarWidth - (rowHeadersWitdth + dailyNotesWidth)
}

export function useCalendarRows () {
  return useContext(CalendarContext).rows
}

export function useCalendarHeight () {
  const hourHeight = useHourHeight()
  const scheduleHeight = useScheduleRowHeight()
  const calendarRows = useCalendarRows()
  const totalRowCount = calendarRows.reduce((total, row) => {
    return total + row.rowCount
  }, 0)
  return hourHeight + totalRowCount * scheduleHeight
}

export function useHourSectionCount () {
  const { hourSectionCount } = useContext(CalendarContext)
  return hourSectionCount
}

export function useCalendar () {
  return useContext(CalendarContext)
}
