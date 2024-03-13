import { useMemo } from "react"

import {
  Dialog,
  DialogTitle,
} from "@mui/material"

import EditScheduelForm from "../CalendarEditScheduleDialogForm"
import { createFormValueFromSchedule } from "../CalendarEditScheduleDialogForm/utilities"
import { useCalendar } from "../hooks"

export default function CalendarEditScheduleDialog () {
  const { scheduleToEdit, finishToEditSchedule, updateSchedule, accounts } = useCalendar()

  const defaultValues = useMemo(() => {
    return createFormValueFromSchedule(scheduleToEdit ?? {}, accounts)
  }, [scheduleToEdit, accounts])

  return (
    <Dialog
      fullWidth maxWidth="sm"
      open={!!scheduleToEdit} onClose={finishToEditSchedule}>
      <DialogTitle>編集</DialogTitle>
      {scheduleToEdit && (
        <EditScheduelForm
          id={scheduleToEdit.id}
          type="ALL"
          accounts={accounts}
          defaultValues={defaultValues}
          onCancel={finishToEditSchedule}
          onSubmit={(schedule) => {
            updateSchedule({
              ...scheduleToEdit,
              ...schedule,
            })
            finishToEditSchedule()
          }} />
      )}
    </Dialog>
  )
}
