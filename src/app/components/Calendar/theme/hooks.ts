'use client'

import { createContext, useContext, useState } from "react"

interface CalendarThemeContextValue {
  hourHeight: number
  hourWidth: number
  rowHeaderWidth: number
  dailyNoteWidth: number
  scheduleRowHeight: number
  deckWidth: number
  scheduleHeight: number
  zIndex: {
    rowHead: number
    timeRulerBody: number
    timeRulerHead: number
    dailyNote: number
  }
}

const defaultCalendarThemeContextValue:CalendarThemeContextValue = {
  hourHeight: 24,
  hourWidth: 100,
  rowHeaderWidth: 64,
  dailyNoteWidth: 200,
  deckWidth: 200,
  scheduleHeight: 28,
  scheduleRowHeight: 30,
  zIndex: {
    rowHead: 500,
    timeRulerHead: 601,
    timeRulerBody: 600,
    dailyNote: 500
  }
}

export const CalendarThemeContext = createContext<CalendarThemeContextValue>(
  defaultCalendarThemeContextValue
)

export function useCalendarThemeContextValue(): CalendarThemeContextValue {
  const [value] = useState<CalendarThemeContextValue>(defaultCalendarThemeContextValue)
  return value
}

export function useHourWidth () {
  const { hourWidth } = useContext(CalendarThemeContext)
  return hourWidth
}

export function useHourHeight () {
  const { hourHeight } = useContext(CalendarThemeContext)
  return hourHeight
}

export function useRowHeaderWidth () {
  const { rowHeaderWidth } = useContext(CalendarThemeContext)
  return rowHeaderWidth
}

export function useDailyNoteWidth () {
  const { dailyNoteWidth } = useContext(CalendarThemeContext)
  return dailyNoteWidth
}

export function useScheduleRowHeight () {
  const { scheduleRowHeight } = useContext(CalendarThemeContext)
  return scheduleRowHeight
}

export function useDeckWidth () {
  const { deckWidth } = useContext(CalendarThemeContext)
  return deckWidth
}

export function useCalendarTheme () {
  return useContext(CalendarThemeContext)
}
