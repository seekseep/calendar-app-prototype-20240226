import { Account } from "../types";
import { getStringOrThrow } from "./utilities";

export function createAccount(data: any): Account {
  return {
    id: getStringOrThrow(data?.id),
    name: getStringOrThrow(data?.name),
  }
}
