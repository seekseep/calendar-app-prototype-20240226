'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useCalendarTheme, useDailyNoteWidth, useHourHeight, useHourWidth, useRowHeaderWidth, useScheduleRowHeight } from "./theme/hooks"
import { CalendarContextValue, CalendarEvents, CalendarOptions, CalendarSettings, CalendarStatus } from "./types"
import { Account, DailyNote, Schedule } from "@/app/types"
import { createRows } from "./services/calendarPack"

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
  rowsUpdatedAt: -1,
  scheduleToEdit: null,
  dailyNoteToEditTag: null,
  dailyNoteToEditBody: null,
  openSchedule: () => undefined,
  closeSchedule: () => undefined,
  changeOptions: () => undefined,
  createSchedule: () => undefined,
  updateSchedule: () => undefined,
  deleteSchedule: () => undefined,
  openDailyNoteTag: () => undefined,
  closeDailyNoteTag: () => undefined,
  openDailyNoteBody: () => undefined,
  closeDailyNoteBody: () => undefined,
  updateDailyNote: () => undefined,
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
  onDeleteSchedule,
  onUpdateDailyNote
}: {
  options?: Partial<CalendarContextValue>
  accounts?: Account[]
  schedules?: Schedule[]
  dailyNotes?: DailyNote[]
} & CalendarEvents): CalendarContextValue {
  const [status, setStatus] = useState<CalendarStatus>('loading')

  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null)
  const [dailyNoteToEditTag, setDailyNoteToEditTag] = useState<DailyNote | null>(null)
  const [dailyNoteToEditBody, setDailyNoteToEditBody] = useState<DailyNote | null>(null)

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

  return {
    ...settings,
    tags,
    status,
    rows,
    rowsUpdatedAt,
    scheduleToEdit,
    dailyNoteToEditTag,
    dailyNoteToEditBody,
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
    openSchedule: (schedule: Schedule) => {
      setScheduleToEdit(schedule)
    },
    openDailyNoteTag: (dailyNote: DailyNote) => {
      setDailyNoteToEditTag(dailyNote)
    },
    closeDailyNoteTag: () => {
      setDailyNoteToEditTag(null)
    },
    openDailyNoteBody: (dailyNote: DailyNote) => {
      setDailyNoteToEditBody(dailyNote)
    },
    closeDailyNoteBody: () => {
      setDailyNoteToEditBody(null)
    },
    closeSchedule: () => {
      setScheduleToEdit(null)
    },
    updateDailyNote: (dailyNote: DailyNote) => {
      onUpdateDailyNote && onUpdateDailyNote(dailyNote)
    },
    createSchedule: (schedule: Schedule) => {
      onCreateSchedule && onCreateSchedule(schedule)
    },
    updateSchedule: (schedule: Schedule) => {
      onUpdateSchedule && onUpdateSchedule(schedule)
    },
    deleteSchedule: (schedule: Schedule) => {
      onDeleteSchedule && onDeleteSchedule(schedule)
    },
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
