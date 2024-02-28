import { CSSProperties } from "react"

import { Box, ButtonBase, Typography } from "@mui/material"

import CalendarRow from "./CalendarRow"
import CalendarRowHead from "./CalendarRowHead"
import { useCalendar, useCalendarRowWidth } from "./hooks"
import { useCalendarTheme } from "./theme/hooks"
import { CalendarRowGroupPayload } from "./types"

export default function CalendarGroupRow ({
  depth = 0,
  row,
  style
}: {
  depth?: number
  row: CalendarRowGroupPayload
  style?: CSSProperties
}) {
  const { openDailyNoteBody } = useCalendar()
  const { dailyNoteWidth, zIndex, scheduleRowHeight } = useCalendarTheme()
  const rowWidth = useCalendarRowWidth(depth)
  const height = row.rowCount * scheduleRowHeight
  return (
    <div style={style}>
      <Box display="flex" width={rowWidth} height={height}>
        <CalendarRowHead depth={depth}>
          <Typography variant="caption">
            {row.name}
          </Typography>
        </CalendarRowHead>
        <Box>
          {row.rows.map((row, index) =>
            <CalendarRow depth={depth + 1} key={index} row={row} />
          )}
        </Box>
        <Box
          position="sticky" right="0"
          flexShrink="0"
          display="flex" flexDirection="row"
          sx={{
            borderLeftStyle: 'solid',
            borderLeftColor: 'divider',
            borderLeftWidth: 0.5,
            borderBottomStyle: 'solid',
            borderBottomColor: 'divider',
            borderBottomWidth: 0.5,
          }}
          width={dailyNoteWidth}
          zIndex={zIndex.dailyNote}
          bgcolor="background.default">
          <ButtonBase onClick={() => {
            if (!row.note) return
            openDailyNoteBody(row.note)
          }}>
            <Typography variant="body2" padding={1} textAlign="left">
              {row.note?.body}
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
    </div>
  )
}
