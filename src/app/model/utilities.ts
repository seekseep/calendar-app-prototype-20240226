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

export function getValidStringArrayOrThrow (value: any) {
  if (!Array.isArray(value)) throw new Error("Value is not an array")
  if (value.some(v => typeof v !== "string")) throw new Error("Value is not an array of strings")
  return value
}
