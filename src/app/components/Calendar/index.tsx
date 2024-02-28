import CalendarThemeProvider from "./theme/Provider"
import CalendarProvider from "./CalendarProvider"
import CalendarToolbar from "./CalendarToolbar"
import CalendarContent from "./CalendarContent"
import CalendarDeck from "./CalendarDeck"
import CalendarContainer from "./CalendarContainer"
import { CalendarOptions, CalendarEvents } from "./types"
import { Account, DailyNote, Schedule } from "@/app/types"
import CalendarEditScheduleDialog from "./CalendarEditScheduleDialog"
import CalendarEditDailyNoteTagDialog from "./CalendarEditDailyNoteTagDialog"
import CalendarEditDailyNoteBodyDialog from "./CalendarEditDailyNoteBodyDialog"

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
          <CalendarEditScheduleDialog />
          <CalendarEditDailyNoteTagDialog />
          <CalendarEditDailyNoteBodyDialog />
        </CalendarContainer>
      </CalendarProvider>
    </CalendarThemeProvider>
  )
}
