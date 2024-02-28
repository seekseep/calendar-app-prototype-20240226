'use client'

import { PropsWithChildren } from "react";
import { CalendarContext, useCalendarValue } from "./hooks";
import { CalendarEvents, CalendarOptions } from "./types";
import { Account, DailyNote, Schedule } from "@/app/types";

export default function CalendarProvider ({
  children,
  ...props
}: PropsWithChildren & {
  options: CalendarOptions
  accounts?: Account[]
  schedules?: Schedule[]
  dailyNotes?: DailyNote[]
} & CalendarEvents) {
  const value = useCalendarValue(props)
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  )
}
