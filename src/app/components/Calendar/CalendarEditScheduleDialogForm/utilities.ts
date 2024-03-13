import { format } from "date-fns"

import { FormValues } from "./types"

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
