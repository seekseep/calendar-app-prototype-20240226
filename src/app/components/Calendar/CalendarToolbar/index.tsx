import { Toolbar } from "@mui/material"

import { useCalendar } from "../hooks"

import ToolbarGlobalContents from './ToolbarGlobalContents'
import ToolbarSelectionContents from './ToolbarSelectionContents'

export default function CalendarToolbar () {
  const { selectedSchedules } = useCalendar()
  const selectedSchedulesCount = selectedSchedules.length

  return (
    <Toolbar
      variant="dense"
      sx={{
        gap: 3,
        alignItems: 'center',
        gridArea: 'toolbar',
        borderBottomWidth: 0.5,
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid'
      }}>
      {selectedSchedulesCount < 1 ? (
        <ToolbarGlobalContents />
      ) : (
        <ToolbarSelectionContents />
      )}
    </Toolbar>
  )
}
