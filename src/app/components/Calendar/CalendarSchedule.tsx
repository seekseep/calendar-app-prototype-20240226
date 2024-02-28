import { Error } from '@mui/icons-material'
import { Box, BoxProps, Typography } from '@mui/material'

import { Schedule } from '@/app/types'

export default function CalendarSchedule ({
  schedule,
  ...props
}: {
  schedule: Pick<Schedule, 'label' | 'color' | 'borderColor' | 'backgroundColor' | 'errorIcon'>
} & BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        borderRadius: 1,
        paddingX: 0.5,
        gap: 0.5,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderStyle: 'solid',
        borderWidth: 1,
        color: schedule.color,
        borderColor: schedule.borderColor,
        backgroundColor: schedule.backgroundColor,
        ...props.sx,
      }}>
      {schedule.errorIcon && <Error fontSize="small" />}
      <Typography variant="caption" padding="0" lineHeight="1">
        {schedule.label}
      </Typography>
    </Box>
  )
}
