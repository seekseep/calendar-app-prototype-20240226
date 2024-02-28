import { Schedule } from "../types";
import { getNumberOrThrow, getScehduelStatusOrThrow, getStringOrThrow } from "./utilities";

export function createSchedule(data: any): Schedule {
  return {
    id: getStringOrThrow(data?.id),
    accountId: getStringOrThrow(data?.accountId),
    startedAt: getStringOrThrow(data?.startedAt),
    finishedAt: getStringOrThrow(data?.finishedAt),
    label: getStringOrThrow(data?.label),
    backgroundColor: getStringOrThrow(data?.backgroundColor),
    color: getStringOrThrow(data?.color),
    borderColor: getStringOrThrow(data?.borderColor),
    errorIcon: (!!data?.errorIcon),
    status: getScehduelStatusOrThrow(data?.status),
    row: getNumberOrThrow(data?.row),
  }
}
