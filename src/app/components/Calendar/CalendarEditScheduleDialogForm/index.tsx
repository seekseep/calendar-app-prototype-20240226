import { useMemo } from "react"

import {
  DialogActions,
  Button,
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Autocomplete
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"

import { FormValues } from "./types"

import { getScehduelStatusOrThrow } from "@/app/model/utilities"
import { Account, Schedule } from "@/app/types"

export default function CalendarEditScheduleDialogForm ({
  accounts,
  defaultValues,
  onCancel,
  onSubmit
}: {
  accounts: Account[]
  defaultValues: Partial<FormValues>
  onCancel: () => any
  onSubmit: (schedule: Partial<Schedule>) => any
}) {
  const {studentOptions, teacherOptions} = useMemo(() => {
    const studentOptions: { label:string, value:string }[] = []
    const teacherOptions: { label:string, value:string }[] = []
    for (const account of accounts) {
      if (account.type === 'STUDENT') {
        studentOptions.push({ label: account.name, value: account.id })
      } else {
        teacherOptions.push({ label: account.name, value: account.id })
      }
    }
    return { studentOptions, teacherOptions }
  }, [accounts])

  const methods = useForm<FormValues>({
    defaultValues,
  })

  console.log(methods.getValues())

  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(values => {
        onSubmit({
          label: values.label,
          subject: values.subject,
          format: values.format,
          startedAt: new Date(`${values.startedDate} ${values.startedTime}`).toISOString(),
          finishedAt: new Date(`${values.startedDate} ${values.finishedTime}`).toISOString(),
          teacherIds: values.teachers.map((teacher: any) => teacher.value),
          studentIds: values.students.map((student: any) => student.value),
          hasProblems: values.hasProblems == '1' ? true : false,
          row: +values.row,
          status: getScehduelStatusOrThrow(values.status),
        })
      })}>
      <DialogContent>
        <Stack direction="column" gap={3}>
          <TextField fullWidth label="表示名" {...methods.register('label')} />
          <Stack direction="row" gap={2}>
            <TextField fullWidth label="科目" {...methods.register('subject')} />
            <TextField fullWidth label="形式" {...methods.register('format')} />
          </Stack>
          <Controller
            control={methods.control} name="teachers"
            render={({ field: { value, onChange } }) => {
              return (
                <Autocomplete
                  options={teacherOptions} multiple
                  renderInput={(params) => <TextField {...params} label="講師" />}
                  onChange={(event, values, reason) => onChange(values)}
                  value={value}
                />
              )
            }}>
          </Controller>
          <Controller
            control={methods.control} name="students"
            render={({ field: { value, onChange } }) => {
              return (
                <Autocomplete
                  options={studentOptions} multiple
                  renderInput={(params) => <TextField {...params} label="生徒" />}
                  onChange={(event, values, reason) => onChange(values)}
                  value={value}
                />
              )
            }}>
          </Controller>
          <Stack direction="row" gap={2}>
            <TextField fullWidth label="日付" {...methods.register('startedDate')} type="date" />
            <TextField fullWidth label="開始" {...methods.register('startedTime')} type="time" />
            <TextField fullWidth label="終了" {...methods.register('finishedTime')} type="time" />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">状態</InputLabel>
            <Select
              id="status-select"
              labelId="status-select-label"
              value={methods.watch('status')}
              {...methods.register('status')}
              label="状態">
              <MenuItem value={"NORMAL"}>通常</MenuItem>
              <MenuItem value={"CANCELED"}>振替待ち</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="行" {...methods.register('row')} type="number" />
          <TextField fullWidth multiline label="備考" {...methods.register('note')} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()}>閉じる</Button>
        <Button type="submit">保存する</Button>
      </DialogActions>
    </Box>
  )
}
