import { format } from "date-fns"

import { EditScheduleType, FormResult, FormValues } from "./types"

import { getScehduelStatusOrThrow } from "@/app/model/utilities"
import { Account, Schedule } from "@/app/types"

export function createFormValueFromSchedule (schedule: Partial<Schedule>, accounts: Account[]): FormValues {
  return {
    label: schedule?.label ?? '',
    format: schedule?.format ?? '',
    subject: schedule?.subject ?? '',
    startedDate: schedule.startedAt ? format(schedule.startedAt, 'yyyy-MM-dd') : '',
    startedTime: schedule.startedAt ? format(schedule.startedAt, 'HH:mm') : '',
    finishedTime: schedule.finishedAt ? format(schedule.finishedAt, 'HH:mm') : '',
    color: schedule.color ?? '',
    hasProblems: schedule.hasProblems ? '1' : '0',
    row: typeof schedule.row == 'number' ? schedule.row.toString() : '0',
    status: schedule.status ?? "NORMAL",
    note: schedule.note ?? '',
    teachers: typeof schedule.teacherIds == 'undefined' ? ([]) : schedule.teacherIds.map(id => {
      const account = accounts.find(account => account.id === id)
      return account
    }).filter(Boolean).map((account) => ({ label: (account as Account).name, value: (account as Account).id })),
    students: typeof schedule.studentIds == 'undefined' ? ([]) : schedule.studentIds.map(id => {
      const account = accounts.find(account => account.id === id)
      return account
    }).filter(Boolean).map((account) => ({ label: (account as Account).name, value: (account as Account).id })),
  }
}

export function createFormResult (values: FormValues, type: EditScheduleType, id: string): FormResult {
  const result: FormResult = { id }

  const isAll = type === 'ALL'

  if (isAll || type == 'BASIC') {
    result.label = values.label
    result.format = values.format
    result.status = getScehduelStatusOrThrow(values.status)
    result.note = values.note
    result.color = values.color
    result.hasProblems = values.hasProblems == '1' ? true : false
    result.row = +values.row
  }

  if (isAll || type == 'SUBJECT') {
    result.subject = values.subject
  }

  if (isAll || type == 'TEACHERS') {
    result.teacherIds = values.teachers.map((teacher: any) => teacher.value)
  }

  if (isAll || type == 'STUDENTS') {
    result.studentIds = values.students.map((student: any) => student.value)
  }

  if (isAll || type == 'DATE') {
    const startedAt = new Date(`${values.startedDate} ${values.startedTime}`)
    const finishedAt = new Date(`${values.startedDate} ${values.finishedTime}`)
    result.startedAt = startedAt.toISOString()
    result.finishedAt = finishedAt.toISOString()
  }

  return result
}
