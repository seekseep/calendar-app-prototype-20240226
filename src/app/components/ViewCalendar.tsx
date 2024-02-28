"use client"

import { useState } from "react"

import { useMutation, useQuery } from "@tanstack/react-query"
import { endOfWeek, format, startOfWeek } from "date-fns"

import { db } from "../mocks/db"
import { createAccount } from "../model/account"
import { createDailyNote } from "../model/dailyNote"
import { createSchedule } from "../model/schedule"
import { DailyNote } from "../types"

import Calendar from "./Calendar"
import { CalendarOptions, UpdateDailyNoteInput, UpdateScheduleInput } from "./Calendar/types"

export default function ViewCalendar() {
  const [options, setOptions] = useState<CalendarOptions>(() => {
    return {
      startDate: format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
      endDate: format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd')
    }
  })

  const dailyNoteQuery = useQuery({
    queryKey: ['dailyNotes'],
    async queryFn () {
      return db.dailyNote.getAll().map(data => createDailyNote(data))
    }
  })

  const accountQuery = useQuery({
    queryKey: ['accounts'],
    async queryFn (){
      return db.account.getAll().map(data => createAccount(data))
    }
  })

  const scheduleQuery = useQuery({
    enabled: (
      typeof options.startDate === 'string'
      && typeof options.endDate === 'string'
    ),
    queryKey: ['scheduels', options.startDate, options.endDate],
    async queryFn () {
      return db.schedule.getAll().map(item => createSchedule(item))
    }
  })

  const updateMutation = useMutation({
    async mutationFn ({ id, ...data}: UpdateScheduleInput) {
      db.schedule.update({
        where: {
          id: { equals: id }
        },
        data: data
      })
    },
    onSuccess () {
      scheduleQuery.refetch()
    }
  })

  const createDailyNoteMutation = useMutation({
    async mutationFn (dailyNote: DailyNote) {
      db.dailyNote.create({
        type: dailyNote.type,
        resourceId: dailyNote.resourceId,
        date: dailyNote.date,
        tag: dailyNote.tag,
        body: dailyNote.body
      })
    },
    onSuccess () {
      dailyNoteQuery.refetch()
    }
  })

  const updateDailyNoteMutation = useMutation({
    async mutationFn ({
      id, ...data
    }: UpdateDailyNoteInput) {
      db.dailyNote.update({
        where: {
          id: { equals: id }
        },
        data
      })
    },
    onSuccess () {
      dailyNoteQuery.refetch()
    }

  })

  return (
    <Calendar
      key={`${options.startDate}-${options.endDate}`}
      options={options}
      onChangeOptions={setOptions}
      onUpdateSchedule={updateMutation.mutate}
      onCreateDailyNote={createDailyNoteMutation.mutate}
      onUpdateDailyNote={updateDailyNoteMutation.mutate}
      accounts={accountQuery.data}
      schedules={scheduleQuery.data}
      dailyNotes={dailyNoteQuery.data} />
  )
}
