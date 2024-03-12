'use client'

import { Box } from "@mui/material"

import CaelndarRow from "./CalendarRow"
import CalendarTimeRuler from "./CalendarTimeRuler"
import { useCalendar } from "./hooks"

export default function CalendarContent () {
  const { rows } = useCalendar()

  return (
    <Box sx={{ gridArea: 'content' }} position="relative" overflow="hidden">
      <Box position="absolute" top="0" left="0" width="100%" height="100%" overflow="auto">
        <CalendarTimeRuler />
        {rows.map((row, index) => (
          <CaelndarRow key={index} row={row} />
        ))}
      </Box>
    </Box>
  )
}
