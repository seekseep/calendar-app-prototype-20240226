'use client'

import { Box, Stack, Typography } from '@mui/material'

import CalendarSchedule from './CalendarSchedule'
import { useCalendar } from './hooks'
import { useCalendarTheme, useDeckWidth } from './theme/hooks'

export default function CalendarDeck () {
  const deckWidth = useDeckWidth()
  const { scheduleHeight } = useCalendarTheme()
  const { cancledSchedules, openSchedule } = useCalendar()
  return (
    <Box
      width={deckWidth}
      flexShrink="0"
      bgcolor="background.default"
      overflow="auto"
      sx={{
        gridArea: 'deck',
        borderLeftWidth: 0.5,
        borderLeftColor: 'divider',
        borderLeftStyle: 'solid'
      }}>
      <Stack direction="column" gap={2} padding={2}>
        <Typography variant="h6">振替待ち</Typography>
        <Stack gap={1}>
          {cancledSchedules.map((schedule) =>
            <CalendarSchedule
              key={schedule.id}
              schedule={schedule}
              onClick={() => openSchedule(schedule)}
              sx={{
                height: scheduleHeight
              }} />
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
