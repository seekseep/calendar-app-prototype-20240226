import { useMemo } from "react"

import {
  Dialog,
  DialogTitle,
} from "@mui/material"

import { useCalendar } from "../hooks"

import EditScheduleThemeForm from "./EditScheduleThemeForm"

export default function CalendarEditSchedulesThemeDialog () {
  const { schedulesToEdit, closeSchedules, updateSchedule } = useCalendar()

  const defaultValues = useMemo(() => {
    const values: { color: string } = { color: '' }
    if (!schedulesToEdit) return values

    if (schedulesToEdit.every(schedule => schedule.color === schedulesToEdit[0].color)) {
      values.color = schedulesToEdit[0].color
    }
    return values
  }, [schedulesToEdit])

  return (
    <Dialog
      fullWidth maxWidth="md"
      open={!!schedulesToEdit} onClose={closeSchedules}>
      <DialogTitle>編集</DialogTitle>
      {schedulesToEdit && (
        <EditScheduleThemeForm
          schedule={defaultValues}
          onCancel={() => closeSchedules()}
          onSubmit={(schedule) => {
            schedulesToEdit.forEach(({ id }) => {
              updateSchedule({
                ...schedule,
                id,
              })
            })
            closeSchedules()
          }} />
      )}
    </Dialog>
  )
}
