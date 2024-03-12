import { Box } from "@mui/material"

import CalendarSchedule from "./CalendarSchedule"
import { useCalendar } from "./hooks"
import { useCalendarTheme } from "./theme/hooks"
import { CalendarScheduleRowPayload } from "./types"

export default function CalendarScheduleRow ({
  row
}: {
  row: CalendarScheduleRowPayload
}) {
  const {
    scheduleRowHeight,
    hourWidth,
    scheduleHeight,
  } = useCalendarTheme()
  const { startHour, openSchedule, toggleSelectedSchedule, selectedSchedules } = useCalendar()

  return (
    <Box display="flex" width="0" height={scheduleRowHeight} position="relative">
      {row.schedules.map((schedule, index) => {
        const sStartedAt = new Date(schedule.startedAt)
        const sFinishedAt = new Date(schedule.finishedAt)
        const sStartHour = sStartedAt.getHours() + sStartedAt.getMinutes() / 60
        const sEndHour = sFinishedAt.getHours() + sFinishedAt.getMinutes() / 60
        const x = (sStartHour - startHour) * hourWidth
        const width = (sEndHour - sStartHour) * hourWidth - 1
        const y = (scheduleRowHeight - scheduleHeight) / 2

        return (
          <CalendarSchedule
            key={index}
            schedule={schedule}
            sx={{
              position: 'absolute',
              left: x,
              top: y,
              width,
              height: scheduleHeight
            }} />
        )
      })}
    </Box>
  )
}
