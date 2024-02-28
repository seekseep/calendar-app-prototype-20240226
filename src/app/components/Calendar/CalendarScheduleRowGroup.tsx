import { CSSProperties, useState, MouseEvent } from "react"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Stack, Chip, Typography, Menu, MenuItem, Divider } from "@mui/material"

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
  const { startHour, endHour, hourSectionCount, tags, updateDailyNote, openDailyNoteTag } = useCalendar()
  const { scheduleRowHeight, hourWidth } = useCalendarTheme()
  const height = row.rowCount * scheduleRowHeight
  const rowWidth = useCalendarRowWidth(depth)
  const bodyWidth = (endHour - startHour + 1) * hourWidth

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Box display="flex" width={rowWidth} height={height} style={style}>
        <CalendarRowHead depth={depth}>
          <Stack width="100%" direction="row" alignItems="center" gap={1} px={1}>
            <Chip
              size="small"
              sx={{ position: 'relative'}}
              onClick={handleClick}
              label={row.note?.tag ?? 'なし'}
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
      {row.note && (
        <Menu
          open={open} onClose={handleClose}
          anchorEl={anchorEl}>
          {tags.map((tag) => (
            <MenuItem
              key={tag}
              onClick={() => {
                if(!row.note) return
                updateDailyNote({
                  ...row.note,
                  tag
                })
                handleClose()
              }}>
              {tag}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            onClick={() => {
              if(!row.note) return
              openDailyNoteTag(row.note)
              handleClose()
            }}>
            新しく作る
          </MenuItem>
        </Menu>
      )}
    </div>
  )
}
