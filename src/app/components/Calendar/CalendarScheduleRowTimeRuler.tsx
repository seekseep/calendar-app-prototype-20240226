import { memo, useMemo } from "react"

import { Box } from "@mui/material"

const CalendarScheduleRowTimeRuler = memo(function CalendarScheduleRowTimeRuler ({
  startHour,
  endHour,
  hourSectionCount,
  hourWidth,
  width,
  height,
}: {
  startHour: number
  endHour: number
  hourSectionCount: number
  hourWidth: number
  height: number
  width: number
}) {
  const sections = useMemo(() => {
    const sections: number[] = []
    for (let i = startHour; i < (endHour + 1); i += 1 / hourSectionCount) {
      sections.push(i)
    }
    return sections
  }, [endHour, hourSectionCount, startHour])

  return (
    <Box width={width} height={height} display="flex">
      {sections.map((_, index) => (
        <Box
          key={index}
          height={height}
          width={hourWidth / hourSectionCount}
          sx={{
            borderRightStyle: 'solid',
            borderRightColor: 'divider',
            borderRightWidth: 0.5,
            borderBottomStyle: 'solid',
            borderBottomColor: 'divider',
            borderBottomWidth: 0.5,
          }} />
      ))}
    </Box>
  )
})

export default CalendarScheduleRowTimeRuler
