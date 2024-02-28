import { ScheduleStatus } from "../types"

export function getStringOrThrow (value: any) {
  if (typeof value !== "string") throw new Error("Value is not a string")
  return value
}

export function getScehduelStatusOrThrow (status: any): ScheduleStatus {
  if (status === "NORMAL") return "NORMAL"
  if (status === "CANCELED") return "CANCELED"
  throw new Error("Invalid status")
}

export function getNumberOrThrow (value: any) {
  if (typeof value !== "number") throw new Error("Value is not a number")
  return value
}
