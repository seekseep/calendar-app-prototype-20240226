import { factory, nullable, primaryKey, } from "@mswjs/data"
import * as muiColors from '@mui/material/colors'
import { add, format, set, startOfWeek } from "date-fns"
import { v4 as uuid } from 'uuid'

export const db = factory({
  account: {
    id: primaryKey(() => uuid()),
    name: String,
    type: String
  },
  schedule: {
    id: primaryKey(() => uuid()),
    teacherIds: Array,
    studentIds: Array,
    startedAt: String,
    finishedAt: String,
    row: Number,
    label: String,
    format: String,
    subject: String,
    color: String,
    hasProblems: Boolean,
    status: String,
    note: String,
    createId: String
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

const teachers = [
  db.account.create({ name: '鈴木', type: 'TEACHER' }),
  db.account.create({ name: '佐藤', type: 'TEACHER' }),
  db.account.create({ name: '山田', type: 'TEACHER' }),
  db.account.create({ name: '斎藤', type: 'TEACHER' }),
  db.account.create({ name: '松本', type: 'TEACHER' }),
  db.account.create({ name: '井上', type: 'TEACHER' }),
  db.account.create({ name: '木村', type: 'TEACHER' }),
]
const students = [
  db.account.create({ name: '山本 圭介', type: 'STUDENT' }),
  db.account.create({ name: '鈴木 一郎', type: 'STUDENT' }),
  db.account.create({ name: '佐藤 二郎', type: 'STUDENT' }),
  db.account.create({ name: '田中 三郎', type: 'STUDENT' }),
  db.account.create({ name: '斎藤 四郎', type: 'STUDENT' }),
  db.account.create({ name: '林 裕太', type: 'STUDENT' }),
  db.account.create({ name: '山田 太郎', type: 'STUDENT' }),
  db.account.create({ name: '斎藤 一郎', type: 'STUDENT' }),
  db.account.create({ name: '佐藤 未来', type: 'STUDENT' }),
  db.account.create({ name: '山本 花子', type: 'STUDENT' }),
  db.account.create({ name: '清水 よしこ', type: 'STUDENT' }),
  db.account.create({ name: '松本 一郎', type: 'STUDENT' }),
  db.account.create({ name: '井上 未来', type: 'STUDENT' }),
  db.account.create({ name: '木村 未来', type: 'STUDENT' }),
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

const colors = [
  muiColors.grey[100].toString(),
  muiColors.amber[500].toString(),
  muiColors.blue[500].toString(),
  muiColors.blueGrey[500].toString(),
  muiColors.brown[500].toString(),
  muiColors.cyan[500].toString(),
  muiColors.deepOrange[500].toString(),
  muiColors.deepPurple[500].toString(),
  muiColors.green[500].toString(),
  muiColors.indigo[500].toString(),
  muiColors.lightBlue[500].toString(),
  muiColors.lightGreen[500].toString(),
  muiColors.lime[500].toString(),
  muiColors.orange[500].toString(),
  muiColors.pink[500].toString(),
  muiColors.purple[500].toString(),
  muiColors.red[500].toString(),
  muiColors.teal[500].toString(),
  muiColors.yellow[500].toString(),
]

// NOTE: 各予定毎のメモ
const schedulesNotes = [
  '',
  '本日はAさんが体調不良のため休診となります。',
  'Bさんの予約がキャンセルとなりました。',
  'Cさんの予約が追加されました。',
  'とても長いメモの場合どのように表示されるのかを確認するための内容がこの部分です。とても長い場合に利用者がのように見えるのかを確認したいです。',
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

  for (let t = 0; t < teachers.length; t++) {
    const teacher = teachers[t]
    const color = colors[(t + i) % colors.length]
    db.dailyNote.create({
      type: 'ACCOUNT',
      resourceId: teacher.id,
      date: format(date, 'yyyy-MM-dd'),
      tag: t < 3 ? '北教室' : '南教室',
      body: ''
    })
    for (let j = 0; j < 5; j++) {
      const createId = uuid()
      const startedAt = set(date, { hours: 0 + j, minutes: 0, seconds: 0 })
      const finishedAt = add(startedAt, { hours: 1})
      const subject0 = getRandomItem(subjects)
      const student0 = getRandomItem(students)
      db.schedule.create({
        teacherIds: [teacher.id],
        studentIds: [student0.id],
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        label: `中学${subject0}`,
        color: color,
        status: 'NORMAL',
        row: 0,
        subject: subject0,
        hasProblems: true,
        format: getRandomItem(formats),
        note: schedulesNotes[(i + 0) % schedulesNotes.length],
        createId
      })
      const subject1 = getRandomItem(subjects)
      const student1 = getRandomItem(students)
      db.schedule.create({
        teacherIds: [teacher.id],
        studentIds: [student1.id],
        startedAt: add(startedAt, { hours: 2 + j * 2 }).toISOString(),
        finishedAt: add(finishedAt, { hours: 2 + j * 2 + 1 }).toISOString(),
        label: `夏期集中${subject1}III`,
        color: color,
        hasProblems: false,
        status: 'NORMAL',
        row: 1,
        subject: subject1,
        format: getRandomItem(formats),
        note: schedulesNotes[(i + 1) % schedulesNotes.length],
        createId
      })
      const subject2 = getRandomItem(subjects)
      const student2 = getRandomItem(students)
      db.schedule.create({
        teacherIds: [teacher.id],
        studentIds: [student2.id],
        startedAt: add(startedAt, { hours: 3 + j * 3 }).toISOString(),
        finishedAt: add(finishedAt, { hours: 3 + j * 3 + 1 }).toISOString(),
        label: `${subject2}体験`,
        color: color,
        status: 'NORMAL',
        hasProblems: true,
        row: 2,
        subject: subject2,
        format: getRandomItem(formats),
        note: schedulesNotes[(i + 2) % schedulesNotes.length],
        createId
      })
    }
  }
}

for (let i = 0; i < 5; i++) {
  const color = colors[i % colors.length]
  const teacher = teachers[i]
  const student = students[i]
  db.schedule.create({
    teacherIds: [teacher.id],
    studentIds: [student.id],
    startedAt: add(new Date(), { hours: 3, minutes: 0 }).toISOString(),
    finishedAt: add(new Date(), { hours: 4, minutes: 0 }).toISOString(),
    label: `プログラミング体験`,
    color: color,
    status: 'CANCELED',
    row: 0,
    hasProblems: true,
    note: schedulesNotes[i % schedulesNotes.length],
    createId: 'none'
  })
}
