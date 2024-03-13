import { useMemo } from "react"

import {
  Dialog,
  DialogTitle,
} from "@mui/material"

import CalendarEditScheduleDialogForm from "../CalendarEditScheduleDialogForm"
import { FormValues } from "../CalendarEditScheduleDialogForm/types"
import { useCalendar } from "../hooks"

export default function CalendarEditSchedulesDialog () {
  const {
    schedulesToEdit, bulkUpdateSchedules, finishToEditSchedules, accounts,
  } = useCalendar()

  const defaultValues = useMemo(() => {
    const values: Partial<FormValues> = {}
    const firstSchedule = schedulesToEdit?.[0]

    if (schedulesToEdit?.every(schedule => schedule.label == firstSchedule?.label)) {
      values.label = firstSchedule?.label
    }
    if (schedulesToEdit?.every(schedule => schedule.format == firstSchedule?.format)) {
      values.format = firstSchedule?.format
    }
    if (schedulesToEdit?.every(schedule => schedule.subject == firstSchedule?.subject)) {
      values.subject = firstSchedule?.subject
    }
    if (schedulesToEdit?.every(schedule => schedule.color == firstSchedule?.color)) {
      values.color = firstSchedule?.color
    }
    if (schedulesToEdit?.every(schedule => schedule.hasProblems == firstSchedule?.hasProblems)) {
      values.hasProblems = firstSchedule?.hasProblems ? '1' : '0'
    }
    if (schedulesToEdit?.every(schedule => schedule.row == firstSchedule?.row)) {
      values.row = typeof firstSchedule?.row == 'number' ? firstSchedule?.row.toString() : ''
    }
    if (schedulesToEdit?.every(schedule => schedule.status == firstSchedule?.status)) {
      values.status = firstSchedule?.status
    }
    if (schedulesToEdit?.every(schedule => schedule.note == firstSchedule?.note)) {
      values.note = firstSchedule?.note
    }

    if (schedulesToEdit?.every(schedule => schedule.teacherIds.every(teacherId => firstSchedule?.teacherIds.includes(teacherId)))) {
      values.teachers = firstSchedule?.teacherIds.map(teacherId => ({
        label: accounts.find(account => account.id == teacherId)?.name ?? '',
        value: teacherId,
      }))
    }

    if (schedulesToEdit?.every(schedule => schedule.studentIds.every(studentId => firstSchedule?.studentIds.includes(studentId)))) {
      values.students = firstSchedule?.studentIds.map(studentId => ({
        label: accounts.find(account => account.id == studentId)?.name ?? '',
        value: studentId,
      }))
    }

    return values
  }, [schedulesToEdit, accounts])

  return (
    <Dialog
      fullWidth maxWidth="sm"
      open={!!schedulesToEdit} onClose={finishToEditSchedules}>
      <DialogTitle>一括編集</DialogTitle>
      {schedulesToEdit && (
        <CalendarEditScheduleDialogForm
          accounts={accounts}
          defaultValues={defaultValues}
          onCancel={finishToEditSchedules}
          onSubmit={(schedule) => {
            bulkUpdateSchedules(
              schedulesToEdit.map(({ id }) => ({
                ...schedule,
                id,
              }))
            )
            finishToEditSchedules()
          }} />
      )}
    </Dialog>
  )
}
