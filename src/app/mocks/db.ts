import { factory, nullable, primaryKey } from "@mswjs/data"
import { add, format, set, startOfWeek } from "date-fns"
import { v4 as uuid } from 'uuid'

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

  if (i < 4) {
    db.dailyNote.create({
      type: 'TEAM',
      resourceId: 'TEAM',
      date: format(date, 'yyyy-MM-dd'),
      tag: '',
      body: [
        '本日はAさんが体調不良のため休診となります。',
        'Bさんの予約がキャンセルとなりました。',
        'Cさんの予約が追加されました。',
        'とても長いメモの場合どのように表示されるのかを確認するための内容がこの部分です。とても長い場合に利用者がのように見えるのかを確認したいです。'
      ][i % 4]
    })
  }

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
        label: `中学国語`,
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
        label: `夏期集中数学III`,
        color: '#333333',
        backgroundColor: '#EEEEEE',
        borderColor: '#CCCCCC',
        errorIcon: false,
        status: 'NORMAL',
        row: 1,
      })
      db.schedule.create({
        accountId: account.id,
        startedAt: add(startedAt, { hours: 3 + j * 3 }).toISOString(),
        finishedAt: add(finishedAt, { hours: 3 + j * 3 + 1 }).toISOString(),
        label: `プログラミング体験`,
        color: '#333333',
        backgroundColor: '#EEEEEE',
        borderColor: '#CCCCCC',
        errorIcon: true,
        status: 'NORMAL',
        row: 2,
      })
    }
  }
}

for (let i = 0; i < 20; i++) {
  db.schedule.create({
    accountId: accounts[0].id,
    startedAt: add(new Date(), { hours: 3, minutes: 0 }).toISOString(),
    finishedAt: add(new Date(), { hours: 4, minutes: 0 }).toISOString(),
    label: `プログラミング体験`,
    color: '#333333',
    backgroundColor: '#EEEEEE',
    borderColor: '#CCCCCC',
    errorIcon: true,
    status: 'CANCELED',
    row: 2,
  })
}
