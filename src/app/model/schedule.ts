import { Schedule } from "../types"

import { getNumberOrThrow, getScehduelStatusOrThrow, getStringOrThrow, getValidStringArrayOrThrow } from "./utilities"

export function createSchedule(data: any): Schedule {
  return {
    id: getStringOrThrow(data?.id),
    studentIds: getValidStringArrayOrThrow(data?.studentIds),
    teacherIds: getValidStringArrayOrThrow(data?.teacherIds),
    startedAt: getStringOrThrow(data?.startedAt),
    finishedAt: getStringOrThrow(data?.finishedAt),
    label: getStringOrThrow(data?.label),
    color: getStringOrThrow(data?.color),
    status: getScehduelStatusOrThrow(data?.status),
    row: getNumberOrThrow(data?.row),
    hasProblems: data?.hasProblems ? true : false,
    subject: getStringOrThrow(data?.subject),
    format: getStringOrThrow(data?.format),
    note: getStringOrThrow(data?.note),
    createId: getStringOrThrow(data?.createId)
  }
}
