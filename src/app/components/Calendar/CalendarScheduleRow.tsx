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
        const width = (sEndHour - sStartHour) * hourWidth
        const y = (scheduleRowHeight - scheduleHeight) / 2
        const selected = selectedSchedules.findIndex(s => s.id === schedule.id) !== -1
        return (
          <CalendarSchedule
            key={index}
            onEdit={() => openSchedule(schedule)}
            onClick={() => {
              toggleSelectedSchedule(schedule)
            }}
            schedule={schedule}
            sx={{
              position: 'absolute',
              left: x,
              top: y,
              width,
              height: scheduleHeight,
              ...(selected ? ({
                outlineStyle: 'solid',
                outlineWidth: 2,
                outlineColor: 'primary.main',
              }) : undefined)
            }} />
        )
      })}
    </Box>
  )
}
