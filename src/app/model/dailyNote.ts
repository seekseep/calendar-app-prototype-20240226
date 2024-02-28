import { DailyNote } from "../types";
import { getStringOrThrow } from "./utilities";

export function createDailyNote (data: any): DailyNote {
  const type = getStringOrThrow(data?.type)
  switch (type) {
    case 'TEAM':
      return {
        id: getStringOrThrow(data?.id),
        resourceId: getStringOrThrow(data?.resourceId),
        body: getStringOrThrow(data?.body),
        date: getStringOrThrow(data?.date),
        tag: getStringOrThrow(data?.tag),
        type: 'TEAM'
      }
    case 'ACCOUNT':
      return {
        id: getStringOrThrow(data?.id),
        resourceId: getStringOrThrow(data?.resourceId),
        body: getStringOrThrow(data?.body),
        date: getStringOrThrow(data?.date),
        tag: getStringOrThrow(data?.tag),
        type: 'ACCOUNT'
      }
    default:
      throw new Error('Invalid DailyNote type')
  }
}
