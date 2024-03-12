import { Schedule } from "../types"

import { getNumberOrThrow, getScehduelStatusOrThrow, getStringOrThrow } from "./utilities"

export function createSchedule(data: any): Schedule {
  return {
    id: getStringOrThrow(data?.id),
    accountId: getStringOrThrow(data?.accountId),
    startedAt: getStringOrThrow(data?.startedAt),
    finishedAt: getStringOrThrow(data?.finishedAt),
    label: getStringOrThrow(data?.label),
    color: getStringOrThrow(data?.color),
    status: getScehduelStatusOrThrow(data?.status),
    row: getNumberOrThrow(data?.row),
    hasProblems: data?.hasProblems ? true : false,
    subject: getStringOrThrow(data?.subject),
    format: getStringOrThrow(data?.format),
  }
}
