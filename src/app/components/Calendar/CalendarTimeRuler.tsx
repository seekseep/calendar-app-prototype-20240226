'use client'

import { Box, useTheme, Typography } from "@mui/material";
import { useCalendarWidth, useHours, useRowDepth } from "./hooks";
import { useCalendarTheme, useDailyNoteWidth, useHourHeight, useHourWidth, useRowHeaderWidth } from "./theme/hooks";

export default function CalendarTimeRuler () {
  const { zIndex } = useCalendarTheme()
  const hours = useHours()
  const rowDepth = useRowDepth()
  const hourHeight = useHourHeight()
  const hourWidth = useHourWidth()
  const rowHeaderWidth = useRowHeaderWidth()
  const calendarWidth = useCalendarWidth()
  const theme = useTheme()
  const dailyNoteWidth = useDailyNoteWidth()

  return (
    <Box
      display="flex"
      position="sticky"
      top="0"
      zIndex={zIndex.timeRulerBody}
      width={calendarWidth}
      bgcolor="background.default">
      <Box
        height={hourHeight}
        position="sticky" left="0"
        width={(rowDepth + 1) * rowHeaderWidth}
        bgcolor="background.default"
        zIndex={zIndex.timeRulerHead}
        sx={{
          borderRightStyle: 'solid',
          borderRightColor: 'divider',
          borderRightWidth: 0.5,
          borderBottomStyle: 'solid',
          borderBottomColor: 'divider',
          borderBottomWidth: 0.5,
        }} />
      {hours.map((hour, index, hours) =>
        <Box
          key={hour} width={hourWidth} height={hourHeight}
          zIndex={zIndex.timeRulerBody}
          sx={{
            borderBottomStyle: 'solid',
            borderBottomColor: 'divider',
            borderBottomWidth: 0.5,
            ...(index < hours.length - 1 ? ({
              borderRightStyle: 'solid',
              borderRightColor: 'divider',
              borderRightWidth: 0.5,
            }) : ({ })),
          }}>
          <Typography
            variant="caption"
            sx={{
              paddingInline: 1
            }}>
            {`00${hour}`.slice(-2)}:00
          </Typography>
        </Box>
      )}
      <Box
        height={hourHeight}
        width={dailyNoteWidth}
        position="sticky" right="0"
        zIndex={zIndex.timeRulerHead}
        bgcolor="background.default"
        sx={{
          borderLeftStyle: 'solid',
          borderLeftColor: 'divider',
          borderLeftWidth: 0.5,
          borderBottomStyle: 'solid',
          borderBottomColor: 'divider',
          borderBottomWidth: 0.5,
        }} />
    </Box>
  )
}
