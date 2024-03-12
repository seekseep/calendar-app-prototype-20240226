import { factory, nullable, primaryKey } from "@mswjs/data"
import * as colors from '@mui/material/colors'
import { add, format, set, startOfWeek } from "date-fns"
import { v4 as uuid } from 'uuid'

export const db = factory({
  account: {
    id: primaryKey(() => uuid()),
    name: () => '田中'
  },
  schedule: {
    id: primaryKey(() => uuid()),
    accountId: String,
    startedAt: String,
    finishedAt: String,
    row: Number,
    label: String,
    format: String,
    subject: String,
    color: String,
    hasProblems: Boolean,
    status: String,
  },
  dailyNote: {
    id: primaryKey(() => uuid()),
    type: String,
    resourceId: nullable(String),
    date: String,
    tag: String,
    body: String
  }
})

const accounts = [
  db.account.create({ name: '鈴木' }),
  db.account.create({ name: '佐藤' }),
  db.account.create({ name: '山田' }),
  db.account.create({ name: '斎藤' }),
  db.account.create({ name: '松本' }),
]

const formats = [
  "個別",
  "集団",
]

const subjects = [
  "国語",
  "数学",
  "英語",
  "理科",
  "社会",
]

const baseDate = startOfWeek(new Date())

function getRandomItem<T> (items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

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
      const subject0 = getRandomItem(subjects)
      db.schedule.create({
        accountId: account.id,
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        label: `中学${subject0}`,
        color: colors.grey[100],
        status: 'NORMAL',
        row: 0,
        subject: subject0,
        hasProblems: true,
        format: getRandomItem(formats),
      })
      const subject1 = getRandomItem(subjects)
      db.schedule.create({
        accountId: account.id,
        startedAt: add(startedAt, { hours: 2 + j * 2 }).toISOString(),
        finishedAt: add(finishedAt, { hours: 2 + j * 2 + 1 }).toISOString(),
        label: `夏期集中${subject1}III`,
        color: colors.grey[100],
        hasProblems: false,
        status: 'NORMAL',
        row: 1,
        subject: subject1,
        format: getRandomItem(formats),
      })
      const subject2 = getRandomItem(subjects)
      db.schedule.create({
        accountId: account.id,
        startedAt: add(startedAt, { hours: 3 + j * 3 }).toISOString(),
        finishedAt: add(finishedAt, { hours: 3 + j * 3 + 1 }).toISOString(),
        label: `${subject2}体験`,
        color: colors.grey[100],
        status: 'NORMAL',
        hasProblems: true,
        row: 2,
        subject: subject2,
        format: getRandomItem(formats),
      })
    }
  }
}

for (let i = 0; i < 5; i++) {
  db.schedule.create({
    accountId: accounts[0].id,
    startedAt: add(new Date(), { hours: 3, minutes: 0 }).toISOString(),
    finishedAt: add(new Date(), { hours: 4, minutes: 0 }).toISOString(),
    label: `プログラミング体験`,
    color: colors.grey[100],
    status: 'CANCELED',
    row: 0,
    hasProblems: true,
  })
}
