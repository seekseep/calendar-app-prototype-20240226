import { CSSProperties, MouseEvent } from "react"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Stack, Chip, Typography } from "@mui/material"

import CalendarRowHead from "./CalendarRowHead"
import CalendarScheduleRow from "./CalendarScheduleRow"
import CalendarScheduleRowTimeRuler from "./CalendarScheduleRowTimeRuler"
import { useCalendar, useCalendarRowWidth } from "./hooks"
import { useCalendarTheme } from "./theme/hooks"
import { CalendarScheduleRowGroupPayload } from "./types"

export default function CalendarScheduleRowGroup ({
  depth = 0,
  row,
  style
}: {
  depth?: number
  row: CalendarScheduleRowGroupPayload
  style?: CSSProperties
}) {
  const { startHour, endHour, hourSectionCount, openTagMenu } = useCalendar()
  const { scheduleRowHeight, hourWidth } = useCalendarTheme()
  const height = row.rowCount * scheduleRowHeight
  const rowWidth = useCalendarRowWidth(depth)
  const bodyWidth = (endHour - startHour + 1) * hourWidth

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchorEl = event.currentTarget
    if (row.note) {
      openTagMenu(row.note, anchorEl)
    } else {
      const date = row.keyValueSets.find(set => set.key === 'date')?.value
      if (!date) throw Error('date is not found')
      const resourceId = row.keyValueSets.find(set => set.key === 'accountId')?.value
      if (!resourceId) throw Error('resourceId is not found')
      openTagMenu({
        id: '',
        tag: '',
        body: '',
        date: date,
        resourceId: resourceId,
        type: 'ACCOUNT',
      }, anchorEl)
    }
  }

  return (
    <Box display="flex" width={rowWidth} height={height} style={style}>
      <CalendarRowHead depth={depth}>
        <Stack width="100%" direction="row" alignItems="center" gap={1} px={1}>
          <Chip
            size="small"
            sx={{ position: 'relative'}}
            onClick={handleClick}
            label={row.note?.tag ?? ''}
            deleteIcon={<ArrowDropDownIcon />} />
          <Typography variant="caption">
            {row.name}
          </Typography>
        </Stack>
      </CalendarRowHead>
      <Box position="relative" width={bodyWidth}>
        <Box position="absolute" top="0" left="0" right="0" bottom="0">
          <CalendarScheduleRowTimeRuler
            width={bodyWidth} height={height}
            startHour={startHour} endHour={endHour} hourWidth={hourWidth}
            hourSectionCount={hourSectionCount} />
        </Box>
        {row.rows.map((row, index) => (
          <CalendarScheduleRow
            key={index}
            row={row} />
        ))}
      </Box>
    </Box>
  )
}
