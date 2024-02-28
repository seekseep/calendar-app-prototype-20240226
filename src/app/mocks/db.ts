import { factory, nullable, primaryKey } from "@mswjs/data";
import { v4 as uuid } from 'uuid';
import { add, format, set, startOfDay, startOfWeek } from "date-fns";

export const db = factory({
  account: {
    id: primaryKey(() => uuid()),
    name: () => '田中'
  },
  schedule: {
    id: primaryKey(() => uuid()),
    accountId: () => "account-1",
    startedAt: () => "2021-08-01T09:00:00",
    finishedAt: () => "2021-08-01T18:00:00",
    row: () => 1,
    label: () => "予約",
    color: () => '#333333',
    backgroundColor: () => '#EEEEEE',
    borderColor: () => '#CCCCCC',
    errorIcon: Boolean,
    status: () => 'NORMAL',
  },
  dailyNote: {
    id: primaryKey(() => uuid()),
    type: () => "ACCOUNT",
    resourceId: nullable(String),
    date: () => 'YYYY-MM-DD',
    tag: () => "tag",
    body: () => "メモ"
  }
})

const accounts = [
  db.account.create({ name: '鈴木' }),
  db.account.create({ name: '佐藤' }),
  db.account.create({ name: '山田' }),
  db.account.create({ name: '斎藤' }),
  db.account.create({ name: '松本' }),
]

const baseDate = startOfWeek(new Date())

for (let i = 0; i < 7; i++) {
  const date = add(baseDate, { days: i })

  db.dailyNote.create({
    type: 'TEAM',
    resourceId: 'TEAM',
    date: format(date, 'yyyy-MM-dd'),
    tag: '',
    body: '本日はAさんが体調不良のため休診となります。'
  })

  for (let a = 0; a < accounts.length; a++) {
    const account = accounts[a]
    db.dailyNote.create({
      type: 'ACCOUNT',
      resourceId: account.id,
      date: format(date, 'yyyy-MM-dd'),
      tag: a < 3 ? '北教室' : '南教室',
      body: ''
    })
    for (let j = 0; j < 5; j++) {
      const startedAt = set(date, { hours: 0 + j, minutes: 0, seconds: 0 })
      const finishedAt = add(startedAt, { hours: 1})
      db.schedule.create({
        accountId: account.id,
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        label: `予約 ${i + 1}-${j + 1}-1`,
        color: '#333333',
        backgroundColor: '#EEEEEE',
        borderColor: '#CCCCCC',
        errorIcon: false,
        status: 'NORMAL',
        row: 0,
      })
      db.schedule.create({
        accountId: account.id,
        startedAt: add(startedAt, { hours: 2 + j * 2 }).toISOString(),
        finishedAt: add(finishedAt, { hours: 2 + j * 2 + 1 }).toISOString(),
        label: `予約 ${i + 1}-${j + 1}-2`,
        color: '#333333',
        backgroundColor: '#EEEEEE',
        borderColor: '#CCCCCC',
        errorIcon: false,
        status: 'ERROR',
        row: 1,
      })
      db.schedule.create({
        accountId: account.id,
        startedAt: add(startedAt, { hours: 3 + j * 3 }).toISOString(),
        finishedAt: add(finishedAt, { hours: 3 + j * 3 + 1 }).toISOString(),
        label: `予約 ${i + 1}-${j + 1}-3`,
        color: '#333333',
        backgroundColor: '#EEEEEE',
        borderColor: '#CCCCCC',
        errorIcon: true,
        status: 'ERROR',
        row: 2,
      })
    }
  }
}
