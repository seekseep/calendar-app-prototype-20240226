import { useMemo } from "react"

import {
  Dialog,
  DialogTitle,
} from "@mui/material"
import { format } from "date-fns"

import CalendarEditScheduleDialogForm from "../CalendarEditScheduleDialogForm"
import { FormValues } from "../CalendarEditScheduleDialogForm/types"
import { useCalendar } from "../hooks"

export default function CalendarEditSchedulesDialog () {
  const {
    schedulesToEdit, bulkUpdateSchedules, finishToEditSchedules, accounts,
  } = useCalendar()

  const schedules = schedulesToEdit?.[0]
  const type = schedulesToEdit?.[1]

  const defaultValues = useMemo(() => {
    const values: Partial<FormValues> = {}
    const firstSchedule = schedules?.[0]

    const isAll = type === 'ALL'

    if (isAll || type === 'BASIC') {
      if (schedules?.every(schedule => schedule.label == firstSchedule?.label)) {
        values.label = firstSchedule?.label
      }
      if (schedules?.every(schedule => schedule.format == firstSchedule?.format)) {
        values.format = firstSchedule?.format
      }
      if (schedules?.every(schedule => schedule.color == firstSchedule?.color)) {
        values.color = firstSchedule?.color
      }
      if (schedules?.every(schedule => schedule.hasProblems == firstSchedule?.hasProblems)) {
        values.hasProblems = firstSchedule?.hasProblems ? '1' : '0'
      }
      if (schedules?.every(schedule => schedule.row == firstSchedule?.row)) {
        values.row = typeof firstSchedule?.row == 'number' ? firstSchedule?.row.toString() : ''
      }
      if (schedules?.every(schedule => schedule.status == firstSchedule?.status)) {
        values.status = firstSchedule?.status
      }
      if (schedules?.every(schedule => schedule.note == firstSchedule?.note)) {
        values.note = firstSchedule?.note
      }
    }
    if (isAll || type === 'SUBJECT') {
      if (schedules?.every(schedule => schedule.subject == firstSchedule?.subject)) {
        values.subject = firstSchedule?.subject
      }
    }
    if (isAll || type === 'TEACHERS') {
      if (schedules?.every(schedule => schedule.teacherIds.every(teacherId => firstSchedule?.teacherIds.includes(teacherId)))) {
        values.teachers = firstSchedule?.teacherIds.map(teacherId => ({
          label: accounts.find(account => account.id == teacherId)?.name ?? '',
          value: teacherId,
        }))
      }
    }
    if (isAll || type === 'STUDENTS') {
      if (schedules?.every(schedule => schedule.studentIds.every(studentId => firstSchedule?.studentIds.includes(studentId)))) {
        values.students = firstSchedule?.studentIds.map(studentId => ({
          label: accounts.find(account => account.id == studentId)?.name ?? '',
          value: studentId,
        }))
      }
    }
    if (isAll || type === 'DATE') {
      const startedAt = new Date(firstSchedule?.startedAt ?? '')
      const finishedAt = new Date(firstSchedule?.finishedAt ?? '')
      values.startedDate = format(startedAt, 'yyyy-MM-dd')
      values.startedTime = format(startedAt, 'HH:mm')
      values.finishedTime = format(finishedAt, 'HH:mm')
    }

    return values
  }, [schedules, type, accounts])

  return (
    <Dialog
      fullWidth maxWidth="sm"
      open={!!schedulesToEdit} onClose={finishToEditSchedules}>
      <DialogTitle>一括編集</DialogTitle>
      {schedulesToEdit && (
        <CalendarEditScheduleDialogForm
          id=""
          type={type ?? 'ALL'}
          accounts={accounts}
          defaultValues={defaultValues}
          onCancel={finishToEditSchedules}
          onSubmit={(schedule) => {
            const [schedules] = schedulesToEdit
            bulkUpdateSchedules(
              schedules.map(({ id }) => ({
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
