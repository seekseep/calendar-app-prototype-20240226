import {
  Dialog,
  DialogTitle,
} from "@mui/material"

import { useCalendar } from "../hooks"

import EditScheduelForm from "./EditScheduleForm"

export default function CalendarEditScheduleDialog () {
  const { scheduleToEdit, closeSchedule, updateSchedule } = useCalendar()

  return (
    <Dialog
      fullWidth maxWidth="md"
      open={!!scheduleToEdit} onClose={closeSchedule}>
      <DialogTitle>編集</DialogTitle>
      {scheduleToEdit && (
        <EditScheduelForm
          schedule={scheduleToEdit}
          onCancel={() => closeSchedule()}
          onSubmit={(schedule) => {
            updateSchedule(schedule)
            closeSchedule()
          }} />
      )}
    </Dialog>
  )
}
