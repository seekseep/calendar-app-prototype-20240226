import { Account, AccountType } from "../types"

import { getStringOrThrow } from "./utilities"

function getValidAccountType (data: any): AccountType {
  switch (data) {
    case 'STUDENT':
    case 'TEACHER':
      return data
    default:
      throw new Error('Invalid AccountType')
  }
}

export function createAccount(data: any): Account {
  return {
    id: getStringOrThrow(data?.id),
    name: getStringOrThrow(data?.name),
    type: getValidAccountType(data?.type)
  }
}
