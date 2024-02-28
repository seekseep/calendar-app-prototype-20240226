import { useMemo } from "react"

import {
  Dialog,
  DialogTitle,
} from "@mui/material"

import { ScheduleTheme } from "../CalendarEditScheduleDialog/EditScheduleForm/types"
import { useCalendar } from "../hooks"

import EditScheduleThemeForm from "./EditScheduleThemeForm"

export default function CalendarEditSchedulesThemeDialog () {
  const { schedulesToEdit, closeSchedules, updateSchedule } = useCalendar()

  const defaultValues = useMemo(() => {
    const values: Partial<ScheduleTheme> = {}
    if (!schedulesToEdit) return values

    if (schedulesToEdit.every(schedule => schedule.color === schedulesToEdit[0].color)) {
      values.color = schedulesToEdit[0].color
    }

    if (schedulesToEdit.every(schedule => schedule.borderColor === schedulesToEdit[0].borderColor)) {
      values.borderColor = schedulesToEdit[0].borderColor
    }

    if (schedulesToEdit.every(schedule => schedule.backgroundColor === schedulesToEdit[0].backgroundColor)) {
      values.backgroundColor = schedulesToEdit[0].backgroundColor
    }

    if (schedulesToEdit.every(schedule => schedule.errorIcon === schedulesToEdit[0].errorIcon)) {
      values.errorIcon = schedulesToEdit[0].errorIcon
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
