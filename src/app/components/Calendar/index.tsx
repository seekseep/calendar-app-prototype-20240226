import CalendarContainer from "./CalendarContainer"
import CalendarContent from "./CalendarContent"
import CalendarDeck from "./CalendarDeck"
import CalendarEditDailyNoteBodyDialog from "./CalendarEditDailyNoteBodyDialog"
import CalendarEditDailyNoteTagDialog from "./CalendarEditDailyNoteTagDialog"
import CalendarEditScheduleDialog from "./CalendarEditScheduleDialog"
import CalendarEditSchedulesThemeDialog from "./CalendarEditSchedulesThemeDialog"
import CalendarProvider from "./CalendarProvider"
import CalendarToolbar from "./CalendarToolbar"
import CalendarThemeProvider from "./theme/Provider"
import { CalendarOptions, CalendarEvents } from "./types"

import { Account, DailyNote, Schedule } from "@/app/types"

export default function Calendar (props: ({
  options: CalendarOptions
  accounts?: Account[]
  schedules?: Schedule[]
  dailyNotes?: DailyNote[]
} & CalendarEvents)) {
  return (
    <CalendarThemeProvider>
      <CalendarProvider {...props}>
        <CalendarContainer>
          <CalendarToolbar />
          <CalendarContent />
          <CalendarDeck />
        </CalendarContainer>
        <CalendarEditScheduleDialog />
        <CalendarEditDailyNoteTagDialog />
        <CalendarEditDailyNoteBodyDialog />
        <CalendarEditSchedulesThemeDialog />
      </CalendarProvider>
    </CalendarThemeProvider>
  )
}
