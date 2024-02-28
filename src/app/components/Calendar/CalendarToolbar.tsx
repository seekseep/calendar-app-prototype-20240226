import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Button, Stack, TextField, Toolbar, IconButton, Typography, CircularProgress } from "@mui/material"
import { add, format, sub } from "date-fns"

import { useCalendar } from "./hooks"
import { CalendarSettings } from "./types"

export default function CalendarToolbar () {
  const { startDate, endDate, changeOptions, status } = useCalendar()

  const changeDateOptions = (
    nextOptions: Partial<CalendarSettings>,
  ) => {
    const currentDaysDiff = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    const nextStartDate = nextOptions.startDate ?? startDate
    const nextEndDate = nextOptions.endDate ?? endDate

    const changedStartDate = nextStartDate !== startDate
    const changedEndDate = nextEndDate !== endDate

    if (nextStartDate > nextEndDate) {
      if (changedStartDate) {
        changeOptions({
          startDate: nextStartDate,
          endDate: format(add(new Date(nextStartDate), { days: currentDaysDiff }), 'yyyy-MM-dd')
        })
        return
      }
      if (changedEndDate) {
        changeOptions({
          startDate: format(add(new Date(nextEndDate), { days: -currentDaysDiff }), 'yyyy-MM-dd'),
          endDate: nextEndDate
        })
        return
      }
      return
    }

    changeOptions({
      startDate: nextStartDate,
      endDate: nextEndDate
    })
  }

  return (
    <Toolbar
      variant="dense"
      sx={{
        gridArea: 'toolbar',
        borderBottomWidth: 0.5,
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid'
      }}>
      <Stack direction="row" gap={3} alignItems="center">
        <Button variant="outlined">今日</Button>
        <Stack direction="row" gap={1}>
          <IconButton onClick={() => {
            const currentDaysDiff = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
            changeDateOptions({
              startDate: format(sub(new Date(startDate), { days: currentDaysDiff }), 'yyyy-MM-dd'),
              endDate: format(sub(new Date(endDate), { days: currentDaysDiff }), 'yyyy-MM-dd')
            })
          }}>
            <ChevronLeft />
          </IconButton>
          <Stack direction="row" gap={1} alignItems="center">
            <TextField size="small" type="date" value={startDate} onChange={event => changeDateOptions({ startDate: event.target.value })} />
            <Typography>-</Typography>
            <TextField size="small" type="date" value={endDate} onChange={event => changeDateOptions({ endDate: event.target.value })} />
          </Stack>
          <IconButton onClick={() => {
            const currentDaysDiff = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
            changeDateOptions({
              startDate: format(add(new Date(startDate), { days: currentDaysDiff }), 'yyyy-MM-dd'),
              endDate: format(add(new Date(endDate), { days: currentDaysDiff }), 'yyyy-MM-dd')
            })
          }}>
            <ChevronRight />
          </IconButton>
        </Stack>
        {status == 'loading' && <CircularProgress size={20} />}
      </Stack>
    </Toolbar>
  )
}
