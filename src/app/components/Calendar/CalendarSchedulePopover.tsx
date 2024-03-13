import CalendarScheduleMenu from "./CalendarScheduleMenu"
import { useCalendar } from "./hooks"

export default function CalendarSchedulePopover () {
  const { scheduleMenu, closeSchedule } = useCalendar()
  if (!scheduleMenu) return null
  return (
    <CalendarScheduleMenu
      open
      close={closeSchedule}
      schedule={scheduleMenu?.schedule}
      anchorEl={scheduleMenu?.anchorEle}
      onClose={closeSchedule} />
  )
}
