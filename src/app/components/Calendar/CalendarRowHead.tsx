import { PropsWithChildren } from "react"

import { Box } from "@mui/material"

import { useCalendar } from "./hooks"
import { useCalendarTheme } from "./theme/hooks"

export default function CalendarRowHead ({
  children,
  depth = 0
}: PropsWithChildren & {
  depth?: number
}) {
  const { zIndex, rowHeaderWidth } = useCalendarTheme()
  const { rowDepth } = useCalendar()

  const width = (depth == rowDepth - 1) ? rowHeaderWidth * 2 : rowHeaderWidth

  return (
    <Box
      bgcolor="background.default"
      width={width}
      display="flex"
      position="sticky"
      flexShrink="0"
      left={depth * rowHeaderWidth}
      justifyContent="center" alignItems="center"
      zIndex={zIndex.rowHead}
      sx={{
        borderRightStyle: 'solid',
        borderRightColor: 'divider',
        borderRightWidth: 0.5,
        borderBottomStyle: 'solid',
        borderBottomColor: 'divider',
        borderBottomWidth: 0.5,
      }}>
      {children}
    </Box>
  )
}
