import CalendarContainer from "./CalendarContainer"
import CalendarContent from "./CalendarContent"
import CalendarDailyNoteTagMenu from "./CalendarDailyNoteTagMenu"
import CalendarDeck from "./CalendarDeck"
import CalendarEditDailyNoteBodyDialog from "./CalendarEditDailyNoteBodyDialog"
import CalendarEditDailyNoteTagDialog from "./CalendarEditDailyNoteTagDialog"
import CalendarEditScheduleDialog from "./CalendarEditScheduleDialog"
import CalendarEditSchedulesDialog from "./CalendarEditSchedulesDialog"
import CalendarProvider from "./CalendarProvider"
import CalendarSchedulePopover from "./CalendarSchedulePopover"
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
        <CalendarEditSchedulesDialog />
        <CalendarSchedulePopover />
        <CalendarDailyNoteTagMenu />
      </CalendarProvider>
    </CalendarThemeProvider>
  )
}
