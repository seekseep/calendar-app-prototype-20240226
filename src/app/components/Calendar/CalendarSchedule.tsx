import { useMemo, useState } from 'react'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
// import TagIcon from '@mui/icons-material/Tag'
import { Box, BoxProps, Typography } from '@mui/material'

import CalendarScheduleMenu from './CalendarScheduleMenu'
import { useCalendar } from './hooks'

import { Schedule } from '@/app/types'

function isBlackTextReadableOnBackground(background: string): boolean {
  const hex = background.replace(/^#/, '')
  const rgb = parseInt(hex, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  const contrastRatio = (luminance + 0.05) / (0 + 0.05)
  return contrastRatio > 15
}

function getDarkenColor(color: string, percentage: number): string {
  // Convert color to RGB components
  const hex = color.replace(/^#/, '')
  const rgb = parseInt(hex, 16)
  let r = (rgb >> 16) & 0xff
  let g = (rgb >> 8) & 0xff
  let b = (rgb >> 0) & 0xff

  // Calculate darken amount
  const darkenFactor = 1 - percentage / 100

  // Darken each RGB component
  r = Math.round(r * darkenFactor)
  g = Math.round(g * darkenFactor)
  b = Math.round(b * darkenFactor)

  // Ensure RGB components stay within 0-255 range
  r = Math.min(Math.max(r, 0), 255)
  g = Math.min(Math.max(g, 0), 255)
  b = Math.min(Math.max(b, 0), 255)

  // Convert RGB components back to hex
  const darkenedHex = ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')

  // Return darkened color in hex format
  return `#${darkenedHex}`
}

export default function CalendarSchedule ({
  schedule,
  onEdit,
  ...props
}: {
  onEdit?: () => void
  schedule: Schedule
} & Omit<BoxProps, 'onClick'>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { selectedSchedules, toggleSelectedSchedule } = useCalendar()
  const someSelected = selectedSchedules.length > 0
  const selected = selectedSchedules.findIndex(s => s.id === schedule.id) !== -1

  const {
    color,
    backgroundColor,
    borderColor,
  } = useMemo(() => {
    const backgroundColor = schedule.color
    const color = isBlackTextReadableOnBackground(backgroundColor) ? 'black' : 'white'
    const borderColor = getDarkenColor(schedule.color, 20)
    return {
      color,
      backgroundColor,
      borderColor
    }
  }, [schedule.color])

  return (
    <>
      <Box
        {...props}
        onClick={(event) => {
          if (!someSelected) {
            setAnchorEl(event.currentTarget)
            return
          }
          toggleSelectedSchedule(schedule)
        }}
        sx={{
          position: 'relative',
          borderRadius: 1,
          color: color,
          border: `1px solid ${borderColor}`,
          backgroundColor: backgroundColor,
          '&:hover .calendar-schedule-checkbox-container': {
            opacity: 0.8
          },
          ...props.sx,
        }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: "flex",
            alignItems: "center",
            cursor: someSelected ? "pointer" : "pointer",
            gap: 0.5,
            paddingX: 0.5,
          }}>
          {schedule.hasProblems && <ErrorOutlineIcon fontSize="small" />}
          <Typography variant="caption" padding="0" lineHeight="1" flexGrow={1}>
            {schedule.label}
          </Typography>
        </Box>
        <Box
          className="calendar-schedule-checkbox-container"
          onClick={(event) => {
            event.stopPropagation()
            toggleSelectedSchedule(schedule)
          }}
          position="absolute" display="flex" alignItems="center" justifyContent="center"
          sx={{
            cursor: "pointer",
            top: 0, right: 0, bottom: 0,
            ...(someSelected ? ({
              opacity: 0.8
            }) : ({
              opacity: 0,
            }))
          }}>
          {selected ? (
            <CheckBoxOutlinedIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </Box>
      </Box>
      <CalendarScheduleMenu
        schedule={schedule} close={() => setAnchorEl(null)}
        open={!!anchorEl} anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)} />
    </>
  )
}
