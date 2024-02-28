'use client'

import { PropsWithChildren } from "react"

import { CalendarThemeContext, useCalendarThemeContextValue } from "./hooks"

export default function CalendarThemeProvider ({ children }: PropsWithChildren) {
  const value = useCalendarThemeContextValue()
  return (
    <CalendarThemeContext.Provider value={value}>
      {children}
    </CalendarThemeContext.Provider>
  )
}
