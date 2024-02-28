import { add, format } from "date-fns"

import { CalendarRowGroupPayload, CalendarScheduleRowGroupPayload } from "../types"

import { Account, DailyNote, Schedule } from "@/app/types"

export function createRows (
  startDate: string,
  endDate: string,
  accounts: Account[],
  schedules: Schedule[],
  dailyNotes: DailyNote[]
) {
  const dailyNoteByDateAndReourceId: Record<string, Record<string, DailyNote>> = {}
  for (let dailyNote of dailyNotes) {
    const dateKey = format(dailyNote.date, 'yyyy-MM-dd')
    const resourceId = dailyNote.resourceId
    if (!dailyNoteByDateAndReourceId[dateKey]) dailyNoteByDateAndReourceId[dateKey] = {}
    dailyNoteByDateAndReourceId[dateKey][resourceId] = dailyNote
  }

  const schedulesByDateAndAccountId = schedules.reduce((acc, schedule) => {
    const dateKey = format(schedule.startedAt, 'yyyy-MM-dd')
    const accountId = schedule.accountId
    if (!acc[dateKey]) acc[dateKey] = {}
    if (!acc[dateKey][accountId]) acc[dateKey][accountId] = []
    acc[dateKey][accountId].push(schedule)
    return acc
  }, {} as Record<string, Record<string, Schedule[]>>)

  const rows: CalendarRowGroupPayload[] = []
  const startedAt = new Date(startDate)
  const endedAt = new Date(endDate)

  for (let date = startedAt; date <= endedAt; date = add(date, { days: 1 })) {
    const dateKey = format(date, 'yyyy-MM-dd')
    const dateRow: CalendarRowGroupPayload = {
      name: format(date, 'M月d日'),
      type: 'group',
      rowCount: 0,
      rows: [],
      note: dailyNoteByDateAndReourceId[dateKey]?.['TEAM'] ?? undefined
    }

    for (let account of accounts) {
      const accountRow: CalendarScheduleRowGroupPayload = {
        name: account.name,
        type: 'schedule',
        rowCount: 0,
        rows: [],
        note: dailyNoteByDateAndReourceId[dateKey]?.[account.id] ?? undefined
      }

      const schedules = schedulesByDateAndAccountId[format(date, 'yyyy-MM-dd')]?.[account.id] ?? []
      for (let schedule of schedules) {
        if (typeof accountRow.rows[schedule.row] === 'undefined') {
          accountRow.rows[schedule.row] = {
            schedules: []
          }
        }
        accountRow.rows[schedule.row].schedules.push(schedule)
      }
      accountRow.rowCount = accountRow.rows.length
      dateRow.rowCount += accountRow.rowCount

      if (accountRow.rows.length === 0) {
        dateRow.rowCount += 1
        accountRow.rowCount = 1
        accountRow.rows.push({
          schedules: []
        })
      }

      dateRow.rows.push(accountRow)
    }

    dateRow.rows = dateRow.rows.sort((a,b) => {
      const aTag = a.note?.tag ?? ''
      const bTag = b.note?.tag ?? ''
      if (aTag == bTag) return a.name.localeCompare(b.name)
      return aTag.localeCompare(bTag)
    })

    dateRow.rowCount = Math.max(dateRow.rowCount, 1)
    rows.push(dateRow)
  }

  return rows
}
