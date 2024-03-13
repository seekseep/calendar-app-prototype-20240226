import { UpdateScheduleInput } from "../types"

export type FormValues = {
  label: string
  format: string
  subject: string
  startedDate: string
  startedTime: string
  finishedTime: string
  color: string
  hasProblems: string
  row: string
  status: string
  note: string
  students: { label: string, value: string }[]
  teachers: { label: string, value: string }[]
}

export type FormResult = UpdateScheduleInput

export type EditScheduleType = 'ALL' | 'BASIC' | 'SUBJECT' | 'DATE' | 'TEACHERS' | 'STUDENTS' | 'OTHERS'
